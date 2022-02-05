let authInterceptor = null;
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
          authInterceptor = this.$http.interceptors.request.use(function (config) {
            config.auth = {
              username: credentials.userid,
              password: credentials.password,
            }
          });
        })
        .catch((error) => {
          commit("setUserid", null);
          commit("setPassword", null);
          this.$http.interceptors.request.eject(authInterceptor);
          throw error;
        });
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.userid && state.password;
    },
  },
};
