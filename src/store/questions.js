import Question from "../model/Question";
import questionsCSV from "!raw-loader!../assets/questions.csv";
import { shuffle } from "shuffle-seed";
import dayjs from "dayjs";
import Papa from "papaparse";

const tomorrow = dayjs().add(1, "day").startOf("day");
// First game went live on jan 20th 2022.
const gameNumber = 48; //dayjs().diff(dayjs("2022-01-20"), "days") + 1;
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
    loadQuestions({ commit, state }) {
      const allQuestions = Papa.parse(questionsCSV, { header: true }).data;

      const totalQuestions = allQuestions.length;
      const maxDays = Math.floor(totalQuestions / 5); // 5 questions per day
      let gameNumber = state.gameNumber - 1; // Games are 1-indexed but maths here are easier with zero-indexing

      gameNumber-=48; // I changed the questions on the 48th game so I wanted to start over.
      const cycleNumber = Math.floor(gameNumber / maxDays); // How many times we cycled through all questons

      const gameNumberInCycle = gameNumber - (cycleNumber * maxDays);
      const firstQuestionIndex = (gameNumberInCycle) * 5;

      /* If I want to force the change of the order of the questions,
       * I can create a new deploy with a different salt. */
      const shuffleSalt = 'NaCl';
      const hash = cycleNumber.toString(2) + shuffleSalt;

      const todaysQuestions = shuffle(allQuestions, hash)
        .slice(firstQuestionIndex, firstQuestionIndex + 5)
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
