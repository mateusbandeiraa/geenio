export const score = {
  state: () => ({
    answers: ['','','','',''],
  }),

  actions: {},

  mutations: {
    incrementCurrentQuestion(state) {
      state.currentQuestion++;
    },
    insertCorrectAnswer(state) {
      state.ansers.push("correct");
    },
    insertIncorrectAnswer(state) {
      state.ansers.push("incorrect");
    },
  },

  getters: {
      getAnswers(state){
        return state.answers;
      }
  },
};
