<template>
	<the-header />
	<question-block :question="currentQuestion" />
	<score-bar />
</template>

<script>
import QuestionBlock from "../components/QuestionBlock.vue";
import ScoreBar from "../components/ScoreBar.vue";
import TheHeader from "../components/TheHeader.vue";
export default {
	components: { TheHeader, QuestionBlock, ScoreBar },
	computed: {
		currentQuestion() {
			return this.$store.getters.getCurrentQuestion;
		},
	},
};
</script>

<style>
</style>