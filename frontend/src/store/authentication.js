export const authentication = {
  state: () => ({
    userid: null,
    password: null,
    isAuthenticated: false,
  }),
  mutations: {
    setUserid(state, payload) {
      state.userid = payload;
    },
    setPassword(state, payload) {
      state.password = payload;
    },
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload === true; // Forcing isAuthenticated to be boolean
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
          commit("isAuthenticated", true);
        })
        .catch((error) => {
          commit("setUserid", null);
          commit("setPassword", null);
          commit("isAuthenticated", false);
          throw error;
        });
    },
  },
  getters: {
    hasCredentials(state) {
      return state.userid && state.password;
    },
  },
};
