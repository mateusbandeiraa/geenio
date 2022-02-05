import { createStore } from "vuex";
import { questions } from "./modules/questions";
import { authentication } from "./modules/authentication";

const store = createStore({
  modules: {
    questions,
    authentication,
  },
});

export default store;
