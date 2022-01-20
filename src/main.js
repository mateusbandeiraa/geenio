import { createApp } from "vue";
import { createStore } from "vuex";
import { questions } from "./store/questions";
import App from "./App.vue";

const store = createStore({
  modules: {
    questions
  },
});

createApp(App).use(store).mount("#app");
