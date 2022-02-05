<template>
  <div class="main-container">
    <the-header
      :should-show-score-button="hasGameEnded && !isShowingScore"
      @requestShowScore="isShowingScore = true"
    />
    <div class="main-content">
      <question-block />
    </div>
    <div id="bottom-bar">
      <transition name="fadeinonly">
        <next-question-button
          v-if="shouldShowNextQuestionButton"
          id="next-question-button"
        />
      </transition>
      <transition name="fade">
        <score-bar
          v-if="!isShowingScore"
          id="main-score-bar"
        />
      </transition>
    </div>
    <transition name="fade">
      <score-modal
        v-if="isShowingScore"
        @closeRequested="isShowingScore = false"
      />
    </transition>
  </div>
</template>

<script>
import NextQuestionButton from "../components/NextActionButton.vue";
import QuestionBlock from "../components/QuestionBlock.vue";
import ScoreBar from "../components/ScoreBar.vue";
import ScoreModal from "../components/ScoreModal.vue";
import TheHeader from "../components/TheHeader.vue";
export default {
  components: {
    TheHeader,
    QuestionBlock,
    ScoreBar,
    NextQuestionButton,
    ScoreModal,
  },
  data: function () {
    return {
      isShowingScore: false,
    };
  },
  computed: {
    shouldShowNextQuestionButton() {
      return (
        this.$store.state.questions.isShowingCorrectAlternative &&
        !this.$store.getters.isLastQuestion
      );
    },
    hasGameEnded() {
      return this.$store.getters.hasGameEnded;
    },
  },
  watch: {
    hasGameEnded(val) {
      if (val) {
        this.isShowingScore = true;
      }
    },
  },
};
</script>

<style scoped>
#next-question-button {
  display: block;
  width: 100%;
  margin-bottom: 32px;
}
.main-container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.main-content {
  margin-bottom: 160px;
}

#bottom-bar {
  display: block;
  position: fixed;
  max-width: inherit; /* Inherits from .main-container */
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
</style>
