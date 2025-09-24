<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full flex flex-col flex-grow basis-full items-stretch"
  >
    <div class="flex-grow flex flex-col basis-full place-self-stretch">
      <div v-if="currentProblem" class="text-3xl font-mono mb-6 text-center basis-full place-self-stretch">
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
import { ref, computed, onMounted } from 'vue';
import { useDarkModeStore } from '../stores/darkMode';
import { storeToRefs } from 'pinia';
const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

type Problem = { a: number; b: number; op: string; answer: number };

const userInput = ref('');
const currentProblem = ref<Problem | null>(null);
const feedback = ref('');

onMounted(() => {
  newProblem();
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


const buttonClass = 'base-button';
const acceptButtonClass = 'accept-button';
const eraseButtonClass = 'warning-button';

const buttons = [
  { symbol: '1', class: buttonClass, handler: () => appendInput(1) },
  { symbol: '2', class: buttonClass, handler: () => appendInput(2) },
  { symbol: '3', class: buttonClass, handler: () => appendInput(3) },
  { symbol: '4', class: buttonClass, handler: () => appendInput(4) },
  { symbol: '5', class: buttonClass, handler: () => appendInput(5) },
  { symbol: '6', class: buttonClass, handler: () => appendInput(6) },
  { symbol: '7', class: buttonClass, handler: () => appendInput(7) },
  { symbol: '8', class: buttonClass, handler: () => appendInput(8) },
  { symbol: '9', class: buttonClass, handler: () => appendInput(9) },
  { symbol: 'erase', class: eraseButtonClass, faClass: 'fa-solid fa-delete-left', handler: () => erase() },
  { symbol: '0', class: buttonClass, handler: () => appendInput(0) },
  { symbol: 'submit', class: acceptButtonClass, faClass: 'fa-solid fa-check', handler: () => submit() },
];
</script>