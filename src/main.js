import { createApp } from "vue";
import { createStore } from "vuex";
import { score } from "./store/score";
import { questions } from "./store/questions";
import App from "./App.vue";

const store = createStore({
  modules: {
    score,
    questions
  },
});

createApp(App).use(store).mount("#app");
