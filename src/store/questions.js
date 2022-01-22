import Question from "../model/Question";
import questionsCSV from "!raw-loader!../assets/questions.csv";
import { shuffle } from "shuffle-seed";
import dayjs from 'dayjs' 
import Papa from "papaparse";

const tomorrow = dayjs().add(1, 'day').startOf('day');
// First game went live on jan 20th 2022.
const gameNumber = dayjs().diff(dayjs('2022-01-20'), 'days') + 1;

export const questions = {
  state: () => ({
    nextGameDate: tomorrow,
    gameNumber: gameNumber,
    currentQuestion: 0,
    isShowingCorrectAlternative: false,
    hasGameEnded: false,
    questions: [],
  }),

  actions: {
    selectAlternative(context, alternative) {
      const currentQuestion = context.getters.getCurrentQuestion;
      currentQuestion.selectAlternative = alternative;
    },
    loadQuestions({commit, state}) {
      const allQuestions = Papa.parse(questionsCSV, { header: true }).data;
      const todaysQuestions = shuffle(
        allQuestions,
        state.gameNumber.toString(2)
      )
        .slice(0, 5)
        .map((questionFromCSV) => {
          return new Question(questionFromCSV);
        });
      commit("setQuestions", todaysQuestions);
    },
  },

  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
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
    hasGameEnded(state) {
      return state.hasGameEnded;
    },
  },
};
