import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Survey from '../views/Survey.vue';
import Result from '../views/Result.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Survey
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
