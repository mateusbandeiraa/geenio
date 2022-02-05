<template>
  <my-button
    class="answer-button"
    :class="{
      selected: isSelected,
      correct: shouldShowCorrectAlternative && isCorrectAlternative,
      incorrect: shouldShowCorrectAlternative && !isCorrectAlternative,
    }"
    :disabled="parentQuestion.isAnswered"
    @click="$emit('answerSelected', this)"
  >
    {{ value }}
  </my-button>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
  components: { MyButton },
  props: {
    value: { type: String, required: true },
  },
  emits: ["answerSelected"],
  computed: {
    parentQuestion() {
      return this.$store.getters.getCurrentQuestion;
    },
    isSelected() {
      return this.parentQuestion.selectedAlternative == this.value;
    },
    isCorrectAlternative() {
      return this.parentQuestion.correctAlternative == this.value;
    },
    shouldShowCorrectAlternative() {
      return this.$store.state.questions.isShowingCorrectAlternative;
    },
  },
};
</script>

<style scoped>
.answer-button {
  text-align: left;
}

.answer-button[disabled]:not(.selected, .correct) {
  cursor: default;
  filter: brightness(60%);
  background: transparent;
}

.answer-button.selected {
  background-color: var(--selected-answer-color);
  border-color: var(--selected-answer-border-color);
  border-width: 3px;
  outline: none;
}
.answer-button.correct:not(.selected) {
  border-color: var(--correct-answer-color);
  color: var(--correct-answer-color);
}
.answer-button.selected.correct {
  background-color: var(--correct-answer-color);
  border-color: var(--correct-answer-border-color);
  color: var(--correct-answer-border-color);
}
.answer-button.selected.incorrect {
  background-color: var(--incorrect-answer-color);
  border-color: var(--incorrect-answer-border-color);
}
</style>
