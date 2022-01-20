<template>
	<the-header />
	<question-block />
	<transition name="fade">
		<next-question-button
			id="next-question-button"
			v-if="shouldShowNextQuestionButton"
		/>
	</transition>
	<score-bar />
</template>

<script>
import NextQuestionButton from "../components/NextActionButton.vue";
import QuestionBlock from "../components/QuestionBlock.vue";
import ScoreBar from "../components/ScoreBar.vue";
import TheHeader from "../components/TheHeader.vue";
export default {
	components: { TheHeader, QuestionBlock, ScoreBar, NextQuestionButton },
	computed: {
		shouldShowNextQuestionButton() {
			return this.$store.state.questions.isShowingCorrectAlternative;
		},
	},
};
</script>

<style scoped>
#next-question-button {
	display: block;
	width: 100%;
	margin-top: 64px;
}

.fade-enter-active{
  transition: opacity 250ms ease-in-out;
}

.fade-leave-active {
	transition: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>