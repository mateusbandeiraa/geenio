export const score = {
  state: () => ({
    answers: [],
  }),

  actions: {},

  mutations: {
    insertCorrectAnswer(state) {
      state.answers.push("correct");
    },
    insertIncorrectAnswer(state) {
      state.answers.push("incorrect");
    },
  },

  getters: {
    getAnswers(state) {
      const ARRAY_LENGTH = 5;
      /*
        https://stackoverflow.com/a/64546606

        Always return an array with length ARRAY_LENGTH.
        e.g.:
          state.answers = ['correct', 'incorrect']
          the return will be ['correct', 'incorrect', undefined, undefined, undefined]
      */
      return Array.from({ ...state.answers, length: ARRAY_LENGTH });
    },
  },
};
