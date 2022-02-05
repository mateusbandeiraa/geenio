import { createRouter, createWebHistory } from "vue-router";
import GamePage from "../pages/GamePage.vue";
import store from "../store/store";
console.log(store);
const routes = [
  {
    path: "/",
    name: "GamePage",
    component: GamePage,
  },
  {
    path: "/cortex/login",
    name: "cortexLogin",
    component: () =>
      import(
        /* webpackChunkName: "cortex" */ "../pages/cortex/CortexLoginPage.vue"
      ),
  },
  {
    path: "/cortex/",
    name: "cortexHome",
    component: () =>
      import(
        /* webpackChunkName: "cortex" */ "../pages/cortex/CortexHomePage.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({
      name: "cortexLogin",
      params: {
        redirectTo: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
