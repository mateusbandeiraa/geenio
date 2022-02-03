import { createRouter, createWebHistory } from 'vue-router'
import GamePage from '../pages/GamePage.vue'

const routes = [
  {
    path: '/',
    name: 'GamePage',
    component: GamePage
  },
  {
    path: '/cortex',
    name: 'Cortex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/CortexPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
