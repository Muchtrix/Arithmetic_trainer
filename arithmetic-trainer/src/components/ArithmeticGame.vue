<template>
  <div
    :class="[darkMode ? 'bg-gray-800' : 'bg-white', 'shadow-lg rounded-2xl p-6 w-full flex flex-col h-full']"
  >
    <div class="flex-grow flex flex-col">
      <div v-if="currentProblem" class="text-3xl font-mono mb-6 text-center flex-1">
        {{ currentProblem.a }} {{ currentProblem.op }} {{ currentProblem.b }} = {{ userInput || '?' }}
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4 flex-grow-0">
        <button
          v-for="b in buttons"
          :key="b.symbol"
          :class="b.class"
          @click="b.handler"
        >
          <i v-if="b.faClass" :class="b.faClass"></i>
          <span v-else>{{ b.symbol }}</span>
        </button>
      </div>
      <div v-if="feedback" :class="feedbackClass" class="text-lg font-semibold text-center mb-2">
        {{ feedback }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
const props = defineProps<{ darkMode: boolean }>();

type Problem = { a: number; b: number; op: string; answer: number };

const userInput = ref('');
const currentProblem = ref<Problem | null>(null);
const feedback = ref('');

onMounted(() => {
  newProblem();
});

watch(() => props.darkMode, () => {
  // react to darkMode changes if needed
});

const generateProblem = (): Problem => {
  const ops = ['+', '-', '*', '/'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 20) + 1;
  let b = Math.floor(Math.random() * 20) + 1;
  if (op === '/') {
    a = a * b;
  } else if (op === '-') {
    if (b > a) [a, b] = [b, a];
  }
  let answer;
  switch (op) {
    case '+': answer = a + b; break;
    case '-': answer = a - b; break;
    case '*': answer = a * b; break;
    case '/': answer = a / b; break;
    default: answer = 0;
  }
  return { a, b, op, answer };
};

const newProblem = () => {
  currentProblem.value = generateProblem();
  userInput.value = '';
  feedback.value = '';
};

const appendInput = (n: number) => {
  userInput.value += n.toString();
};

const erase = () => {
  userInput.value = userInput.value.slice(0, -1);
};

const submit = () => {
  if (!currentProblem.value || userInput.value === '') return;
  const userAnswer = parseInt(userInput.value, 10);
  if (userAnswer === currentProblem.value.answer) {
    feedback.value = 'Correct!';
    setTimeout(newProblem, 1000);
  } else {
    feedback.value = `Wrong! Answer: ${currentProblem.value.answer}`;
    setTimeout(newProblem, 2000);
  }
};

const feedbackClass = computed(() =>
  feedback.value.startsWith('Correct') ? 'text-green-400' : 'text-red-400'
);

const buttonClass = computed(() =>
  ['btn', props.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900']
);

const acceptButtonClass = computed(() =>
  ['btn', props.darkMode ? 'bg-green-600 text-white' : 'bg-green-300 text-gray-900']
);

const eraseButtonClass = computed(() =>
  ['btn', props.darkMode ? 'bg-amber-500 text-white' : 'bg-amber-300 text-gray-900']
);

const buttons = computed(() => [
  { symbol: '1', class: buttonClass.value, handler: () => appendInput(1) },
  { symbol: '2', class: buttonClass.value, handler: () => appendInput(2) },
  { symbol: '3', class: buttonClass.value, handler: () => appendInput(3) },
  { symbol: '4', class: buttonClass.value, handler: () => appendInput(4) },
  { symbol: '5', class: buttonClass.value, handler: () => appendInput(5) },
  { symbol: '6', class: buttonClass.value, handler: () => appendInput(6) },
  { symbol: '7', class: buttonClass.value, handler: () => appendInput(7) },
  { symbol: '8', class: buttonClass.value, handler: () => appendInput(8) },
  { symbol: '9', class: buttonClass.value, handler: () => appendInput(9) },
  { symbol: 'erase', class: eraseButtonClass.value, faClass: 'fa-solid fa-delete-left', handler: () => erase() },
  { symbol: '0', class: buttonClass.value, handler: () => appendInput(0) },
  { symbol: 'submit', class: acceptButtonClass.value, faClass: 'fa-solid fa-check', handler: () => submit() },
]);
</script>

<style scoped>
.btn {
  font-size: 1.25rem;
  font-weight: bold;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: color 0.2s, background 0.2s, transform 0.1s;
}
.btn:active {
  transform: scale(0.95);
}
</style>
