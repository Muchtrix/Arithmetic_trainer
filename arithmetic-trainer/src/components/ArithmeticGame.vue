<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full flex flex-col flex-grow basis-full"
  >
    <div class="flex-grow flex flex-col basis-full">
      <div class="basis-full flex-grow-1 flex flex-col justify-end">
        <div v-for="(p, index) in problemHistory" :key="index" :class="['text-lg font-mono mb-1 text-center', p.color]">
          {{ p.a }} {{ p.op }} {{ p.b }} = {{ p.userAnswer }} <span v-if="p.correct">✓</span><span v-else>✗ ({{ p.answer }})</span>
        </div>
      </div>
      <div v-if="currentProblem" class="text-4xl font-mono mb-6 text-center flex-grow-0">
        {{ currentProblem.a }} {{ currentProblem.op }} {{ currentProblem.b }} = {{ userInput || '?' }}
      </div>
      <div class="grid grid-cols-3 gap-4 flex-grow-0">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

type Problem = { a: number; b: number; op: string; answer: number };
type SolvedProblem = Problem & { userAnswer: number; correct: boolean, color: string };

const userInput = ref('');
const currentProblem = ref<Problem | null>(null);
const problemHistory = ref<SolvedProblem[]>([]);

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
};

const appendInput = (n: string) => {
  userInput.value += n;
};

const erase = () => {
  userInput.value = userInput.value.slice(0, -1);
};

const submit = () => {
  if (!currentProblem.value || userInput.value === '') return;
  problemHistory.value.push(createSolvedProblem(currentProblem.value, parseInt(userInput.value, 10)));
  console.log(problemHistory.value);
  newProblem();
};

const createSolvedProblem = (problem: Problem, userAnswer: number): SolvedProblem => {
  const isCorrect = userAnswer === problem.answer;
  return {
    ...problem,
    userAnswer,
    correct: isCorrect,
    color: isCorrect ? 'text-green-400' : 'text-red-400',
  };
};


const buttonClass = 'base-button';
const acceptButtonClass = 'accept-button';
const eraseButtonClass = 'warning-button';

const buttons = [
  { symbol: '1', class: buttonClass, handler: () => appendInput('1') },
  { symbol: '2', class: buttonClass, handler: () => appendInput('2') },
  { symbol: '3', class: buttonClass, handler: () => appendInput('3') },
  { symbol: '4', class: buttonClass, handler: () => appendInput('4') },
  { symbol: '5', class: buttonClass, handler: () => appendInput('5') },
  { symbol: '6', class: buttonClass, handler: () => appendInput('6') },
  { symbol: '7', class: buttonClass, handler: () => appendInput('7') },
  { symbol: '8', class: buttonClass, handler: () => appendInput('8') },
  { symbol: '9', class: buttonClass, handler: () => appendInput('9') },
  { symbol: 'erase', class: eraseButtonClass, faClass: 'fa-solid fa-delete-left', handler: () => erase() },
  { symbol: '0', class: buttonClass, handler: () => appendInput('0') },
  { symbol: 'submit', class: acceptButtonClass, faClass: 'fa-solid fa-check', handler: () => submit() },
];
</script>