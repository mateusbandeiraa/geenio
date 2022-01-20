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
	},
	methods: {
		handleAnswerSelected(alternativeIndex) {
			this.question.selectedAlternative = alternativeIndex;
			setTimeout(() => {
				this.$store.commit('showCorrectAlternative');
			}, 1500);
			// const correctAnswer = this.question.answer;
			// const selectedAnswer = this.question.alternatives.indexOf(button.text);

			// const didSelectCorrectAnswer = (correctAnswer == selectedAnswer);

			// if(didSelectCorrectAnswer){
			// 	this.$store.commit('insertCorrectAnswer');
			// } else {
			// 	this.$store.commit('insertIncorrectAnswer');
			// }

			// this.$store.commit('incrementCurrentQuestion');
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