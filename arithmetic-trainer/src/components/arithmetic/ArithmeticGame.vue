<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full flex flex-col flex-grow basis-full"
  >
    <div class="flex-grow flex flex-col basis-full">
      <transition-group 
        tag="div"
        name="recent-list"
        class="basis-full flex-grow-1 flex flex-col justify-end">
        <div v-for="p in recentProblems" :key="p.id" :class="['text-lg font-mono mb-1 text-center', p.color]">
          {{ p.a }} {{ p.op }} {{ p.b }} = {{ p.userAnswer }}
        </div>
      </transition-group>
      <div class="text-4xl font-mono mb-6 text-center flex-grow-1 flex-shrink-0 basis-l">
        <transition name="current-problem">
          <div v-if="currentProblem">
            {{ currentProblem.a }} {{ currentProblem.op }} {{ currentProblem.b }} = {{ userInput || '?' }}
          </div>
        </transition>
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
import { ref, onMounted, nextTick } from 'vue';

type Problem = { a: number; b: number; op: string; answer: number, id: number };
type SolvedProblem = Problem & { userAnswer: number; correct: boolean, color: string };

const userInput = ref('');
let problemIdCounter = 0;
const currentProblem = ref<Problem | null>(null);
const problemHistory = ref<SolvedProblem[]>([]);

const maxRecentProblems = 3;
const recentProblems = ref<SolvedProblem[]>([]);

onMounted(() => {
  newProblem();
});

const generateProblem = (id: number): Problem => {
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
  return { a, b, op, answer, id };
};

const newProblem = () => {
  problemIdCounter += 1;
  currentProblem.value = generateProblem(problemIdCounter);
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
  const solved = createSolvedProblem(currentProblem.value, parseInt(userInput.value, 10));
  problemHistory.value.push(solved);

  if (recentProblems.value.length >= maxRecentProblems) {
    recentProblems.value.shift();
  }
  recentProblems.value.push(solved);
  currentProblem.value = null;
  nextTick().then(() => {
    newProblem();
  });
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
<style scoped>
@import './style.scss';
</style>