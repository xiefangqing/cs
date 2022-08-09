import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/c1'
  },
  {
    path: '/c1',
    name: 'c1',
    component: () => import('../views/C1.vue')
  },
  {
    path: '/c2',
    name: 'c2',
    component: () => import('../views/C2.vue')
  },
  {
    path: '/c3',
    name: 'c3',
    component: () => import('../views/C3.vue')
  },
  {
    path: '/c4',
    name: 'c4',
    component: () => import('../views/C4.vue')
  },
  {
    path: '/c5',
    name: 'c5',
    component: () => import('../views/C5.vue')
  },
  {
    path: '/c6',
    name: 'c6',
    component: () => import('../views/C6.vue')
  },
  {
    path: '/c7',
    name: 'c7',
    component: () => import('../views/C7.vue')
  },
  {
    path: '/c8',
    name: 'c8',
    component: () => import('../views/C8.vue')
  },
  {
    path: '/c9',
    name: 'c9',
    component: () => import('../views/C9.vue')
  },
  {
    path: '/c10',
    name: 'c10',
    component: () => import('../views/C10.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
