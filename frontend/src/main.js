/* Startup */
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

/* Vuex config */
import { createStore } from "vuex";
import { questions } from "./store/questions";
import {authentication} from './store/authentication';

const store = createStore({
  modules: {
    questions,
    authentication
  },
});

app.use(store);

/* Vue Router config */
import router from "./router";
app.use(router);

/* DayJS config */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale("pt-br");

/* Axios config */
import axios from "axios";
const axiosAPI = axios.create({
  baseURL: "/api",
});
app.config.globalProperties.$http = axiosAPI;
store.$http = axiosAPI; // So authentication.js can call the api

/* App mounting */
app.mount("#app");
