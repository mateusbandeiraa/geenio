import Question from "../model/Question";
export const questions = {
  state: () => ({
    currentQuestion: 0,
    isShowingCorrectAlternative: false,
    hasGameEnded: false,
    questions: [
      new Question({
        text: "Qual o nome da condição em que uma pessoa tem olhos de cores diferentes?",
        alternatives: ["Heterocromia", "Monocromia", "Transcromia"],
        correctAlternative: 0,
      }),
      new Question({
        text: "Quantos dedos um gato tem, no total?",
        alternatives: ["16", "18", "20"],
        correctAlternative: 1,
      }),
      new Question({
        text: "O que significa \"Delivery\"?",
        alternatives: ["Entrega", "Deliberar", "Pedido"],
        correctAlternative: 0,
      }),
      new Question({
        text: "Quantos estados há no Brasil? (Sem o DF)",
        alternatives: ["24", "25", "26"],
        correctAlternative: 2,
      }),
      new Question({
        text: "O século XIX iniciou-se em qual ano?",
        alternatives: ["1801", "1901", "1900"],
        correctAlternative: 0,
      }),
    ],
  }),

  actions: {
    selectAlternative(context, alternative) {
      const currentQuestion = context.getters.getCurrentQuestion;
      currentQuestion.selectAlternative = alternative;
    },
  },

  mutations: {
    incrementCurrentQuestion(state) {
      state.isShowingCorrectAlternative = false;
      state.currentQuestion++;
    },
    showCorrectAlternative(state) {
      state.isShowingCorrectAlternative = true;
    },
    finishGame(state) {
      state.hasGameEnded = true;
    },
  },

  getters: {
    getCurrentQuestion(state) {
      return state.questions[state.currentQuestion];
    },
    getQuestions(state) {
      return state.questions;
    },
    getTotalCorrectAnswers(state) {
      return state.questions.filter(
        (question) =>
          question.isAnswered && question.isSelectedAlternativeCorrect
      ).length;
    },
    isLastQuestion(state) {
      return state.currentQuestion + 1 == state.questions.length;
    },
    hasGameEnded(state){
      return state.hasGameEnded;
    }
  },
};
