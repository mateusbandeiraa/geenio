import Question from '../model/Question'
export const questions = {
  state: () => ({
    currentQuestion: 0,
    isShowingCorrectAlternative: false,
    questions: [
      new Question({
        text: "Quantos cocos uma andorinha é capaz de carregar?",
        alternatives: ["Uma", "Duas", "Três"],
        correctAlternative: 0,
      }),
      new Question({
        text: "Pergunta dois",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        correctAlternative: 1,
      }),
      new Question({
        text: "Pergunta três",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        correctAlternative: 1,
      }),
      new Question({
        text: "Pergunta quatro",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        correctAlternative: 1,
      }),
      new Question({
        text: "Pergunta cinco",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        correctAlternative: 1,
      }),
    ],
  }),

  actions: {
    selectAlternative(context, alternative){
      const currentQuestion = context.getters.getCurrentQuestion;
      currentQuestion.selectAlternative = alternative;
    }
  },

  mutations: {
    incrementCurrentQuestion(state) {
      state.isShowingCorrectAlternative = false;
      state.currentQuestion++;
    },
    showCorrectAlternative(state) {
      state.isShowingCorrectAlternative = true;
    }
  },

  getters: {
    getCurrentQuestion(state) {
      return state.questions[state.currentQuestion];
    },
    getQuestions(state){
      return state.questions;
    },
    isLastQuestion(state){
      return (state.currentQuestion + 1) == state.questions.length;
    }
  },
};
