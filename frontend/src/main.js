/* Startup */
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

/* Vuex config */
import store from "./store/store";

app.use(store);

/* Vue Router config */
import router from "./router/router";

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
const axiosInstance = axios.create({
  baseURL: "/api",
});
app.config.globalProperties.$http = axiosInstance;
store.$http = axiosInstance; // So authentication.js can call the api

axiosInstance.interceptors.request.use((config) => {
  if (store.getters.isAuthenticated) {
    config.auth = store.getters.getAxiosAuth;
  }
  return config;
});

/* App mounting */
app.mount("#app");
