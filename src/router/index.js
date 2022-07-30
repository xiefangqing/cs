import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/c1'
  },
  {
    path: '/c1',
    name: 'c1',
    component: () => import('../views/c1.vue')
  },
  {
    path: '/c2',
    name: 'c2',
    component: () => import('../views/c2.vue')
  },
  {
    path: '/c3',
    name: 'c3',
    component: () => import('../views/c3.vue')
  },
  {
    path: '/c4',
    name: 'c4',
    component: () => import('../views/c4.vue')
  },
  {
    path: '/c5',
    name: 'c5',
    component: () => import('../views/c5.vue')
  },
  {
    path: '/c6',
    name: 'c6',
    component: () => import('../views/c6.vue')
  },
  {
    path: '/c7',
    name: 'c7',
    component: () => import('../views/c7.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
