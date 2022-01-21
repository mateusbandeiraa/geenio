import Question from "../model/Question";
export const questions = {
  state: () => ({
    gameNumber: 2,
    currentQuestion: 0,
    isShowingCorrectAlternative: false,
    hasGameEnded: false,
    questions: [
      new Question({
        text: "Qual a capital do Mato Grosso?",
        alternatives: ["Campo Grande", "Cuiabá", "Rio Branco"],
        correctAlternative: 1,
      }),
      new Question({
        text: "Em que ano nasceu Elza Soares?",
        alternatives: ["1930", "1931", "1932"],
        correctAlternative: 0,
      }),
      new Question({
        text: "Quais são o menor e o maior país do mundo?",
        alternatives: ["Japão e China", "Mônaco e Estados Unidos", "Vaticano e Rússia"],
        correctAlternative: 2,
      }),
      new Question({
        text: "Quantas Copas do Mundo a França já ganhou?",
        alternatives: ["2", "3", "4"],
        correctAlternative: 0,
      }),
      new Question({
        text: "Em qual destes países o português é língua oficial?",
        alternatives: ["Camarões", "Líbano", "Macau"],
        correctAlternative: 2,
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
