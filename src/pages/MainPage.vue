<template>
	<the-header />
	<div class="main-content">
	<question-block />
	</div>
	<div id="bottom-bar">
		<transition name="fadeinonly">
			<next-question-button
				id="next-question-button"
				v-if="shouldShowNextQuestionButton"
			/>
		</transition>
		<transition name="fade">
			<score-bar id="main-score-bar" v-if="!hasGameEnded" />
		</transition>
	</div>
	<transition name="fade">
		<score-modal v-if="hasGameEnded" />
	</transition>
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
};
</script>

<style scoped>
#next-question-button {
	display: block;
	width: 100%;
	margin-bottom: 32px;
}

.main-content{
	margin-bottom: 160px;
}

#bottom-bar {
	display: block;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 16px;
}
</style>