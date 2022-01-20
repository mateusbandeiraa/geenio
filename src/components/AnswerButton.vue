<template>
	<button
		@click="$emit('answerSelected', this)"
		:class="{
			selected: isSelected,
			correct: shouldShowCorrectAlternative && isCorrectAlternative,
			incorrect: shouldShowCorrectAlternative && !isCorrectAlternative,
		}"
		:disabled="parentQuestion.isAnswered"
	>
		{{ text }}
	</button>
</template>

<script>
export default {
	props: {
		text: { type: String, required: true },
	},
	computed: {
		parentQuestion() {
			return this.$store.getters.getCurrentQuestion;
		},
		alternativeIndex() {
			return this.parentQuestion.getAlternativeIndex(this.text);
		},
		isSelected() {
			return (
				this.parentQuestion.selectedAlternative == this.alternativeIndex
			);
		},
		isCorrectAlternative() {
			return (
				this.parentQuestion.correctAlternative == this.alternativeIndex
			);
		},
		shouldShowCorrectAlternative() {
			return this.$store.state.questions.isShowingCorrectAlternative;
		},
	},
	emits: ["answerSelected"],
};
</script>

<style scoped>
/* Reset button styles. From: https://css-tricks.com/overriding-default-button-styles */
button {
	border: 2px solid var(--main-color);
	border-radius: 32px;
	display: inline-block;
	padding: 1rem 2rem;
	margin: 0;
	text-decoration: none;
	text-align: left;
	background: transparent;
	color: var(--main-color);
	font-size: 1rem;
	cursor: pointer;
	transition: var(--default-transition);
	-webkit-appearance: none;
	-moz-appearance: none;
}

button:hover,
button:focus {
	background: rgba(255, 255, 255, 0.15);
}

button:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
}

button:active {
	transform: scale(0.99);
}

button[disabled]:not(.selected, .correct) {
	cursor: default;
	filter: brightness(60%);
	background: transparent;
}

button.selected {
	background-color: var(--selected-answer-color);
	border-color: var(--selected-answer-border-color);
	border-width: 3px;
	outline: none;
}
button.correct:not(.selected) {
	border-color: var(--correct-answer-color);
	color: var(--correct-answer-color);
}
button.selected.correct {
	background-color: var(--correct-answer-color);
	border-color: var(--correct-answer-border-color);
	color: var(--correct-answer-border-color);
}
button.selected.incorrect {
	background-color: var(--incorrect-answer-color);
	border-color: var(--incorrect-answer-border-color);
}
</style>