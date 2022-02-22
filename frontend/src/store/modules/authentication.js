export const authentication = {
  state: () => ({
    userid: sessionStorage.getItem("cortex/userid"),
    password: sessionStorage.getItem("cortex/password"),
  }),
  mutations: {
    setUserid(state, payload) {
      sessionStorage.setItem("cortex/userid", payload);
      state.userid = payload;
    },
    setPassword(state, payload) {
      sessionStorage.setItem("cortex/password", payload);
      state.password = payload;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return this.$http
        .get("/cortex/login", {
          auth: {
            username: credentials.userid,
            password: credentials.password,
          },
        })
        .then(() => {
          // Login successful
          commit("setUserid", credentials.userid);
          commit("setPassword", credentials.password);
        })
        .catch((error) => {
          commit("setUserid", null);
          commit("setPassword", null);
          throw error;
        });
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.userid && state.password;
    },
    getAxiosAuth(state) {
      return { username: state.userid, password: state.password }
    }
  },
};
