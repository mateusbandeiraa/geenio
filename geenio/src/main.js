import { createApp } from "vue";
import { createStore } from "vuex";
import { questions } from "./store/questions";
import App from "./App.vue";

const store = createStore({
  modules: {
    questions,
  },
});

createApp(App).use(store).mount("#app");

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/pt-br'
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('pt-br');
