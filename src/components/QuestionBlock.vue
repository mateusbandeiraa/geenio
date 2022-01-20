<template>
	<p id="question-text">{{ question.text }}</p>
	<div class="answer-block">
		<answer-button
			v-for="alternative of question.alternatives"
			:key="alternative"
			:text="alternative"
			@answerSelected="
				handleAnswerSelected(question.alternatives.indexOf(alternative))
			"
		/>
	</div>
</template>

<script>
import AnswerButton from "./AnswerButton.vue";
export default {
	components: { AnswerButton },
	computed: {
		question() {
			return this.$store.getters.getCurrentQuestion;
		},
		isLastQuestion() {
			return this.$store.getters.isLastQuestion;
		},
	},
	methods: {
		handleAnswerSelected(alternativeIndex) {
			this.question.selectedAlternative = alternativeIndex;
			setTimeout(() => {
				this.$store.commit("showCorrectAlternative");
				if (this.isLastQuestion) {
					setTimeout(() => {
						this.$store.commit("finishGame");
					});
				}
			}, 750);
		},
	},
};
</script>

<style scoped>
#question-text {
	font-size: 1.75em;
}
.answer-block {
	display: grid;
	row-gap: 16px;
}
</style>