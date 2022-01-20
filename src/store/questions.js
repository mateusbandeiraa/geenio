export const questions = {
  state: () => ({
    currentQuestion: 0,
    questions: [
      {
        text: "Quantos cocos uma andorinha é capaz de carregar?",
        alternatives: ["Uma", "Duas", "Três"],
        answer: 0,
      },
      {
        text: "Pergunta dois",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        answer: 1,
      },
      {
        text: "Pergunta três",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        answer: 1,
      },
      {
        text: "Pergunta quatro",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        answer: 1,
      },
      {
        text: "Pergunta cinco",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        answer: 1,
      },
    ],
  }),

  actions: {},

  mutations: {
    incrementCurrentQuestion(state) {
      state.currentQuestion++;
    },
  },

  getters: {
    getCurrentQuestion(state) {
      return state.questions[state.currentQuestion];
    },
  },
};
