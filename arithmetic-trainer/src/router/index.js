import { createRouter, createWebHistory } from 'vue-router';
import ArithmeticGame from '../components/ArithmeticGame.vue';
// Add more games here as you create them

const routes = [
  {
    path: '/',
    redirect: '/arithmetic',
  },
  {
    path: '/arithmetic',
    name: 'Arithmetic',
    component: ArithmeticGame,
  },
  // Example for future games:
  // {
  //   path: '/other',
  //   name: 'OtherGame',
  //   component: () => import('../components/OtherGame.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
