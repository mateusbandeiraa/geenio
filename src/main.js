import { createApp } from "vue";
import { createStore } from "vuex";
import { score } from "./store/score";
import App from "./App.vue";

const store = createStore({
  modules: {
    score,
  },
});

createApp(App).use(store).mount("#app");
