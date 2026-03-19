import Vue from 'vue';
import VueRouter from 'vue-router';
import RacePage from '@/pages/race/ui/RacePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'race',
    component: RacePage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
