<template>
	<div class="score-bar">
		<div class="score-circles-container">
			<span
				class="score-circle"
				v-for="question in questions"
				:key="question.text"
				:class="{
					correct:
						shouldShowCorrectAlternative(question) &&
						question.isAnswered &&
						question.isSelectedAlternativeCorrect,
					incorrect:
						shouldShowCorrectAlternative(question) &&
						question.isAnswered &&
						!question.isSelectedAlternativeCorrect,
				}"
			></span>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		questions() {
			return this.$store.getters.getQuestions;
		},
		currentQuestion() {
			return this.$store.getters.getCurrentQuestion;
		},
	},
	methods: {
		shouldShowCorrectAlternative(question) {
			if (this.currentQuestion == question) {
				return this.$store.state.questions.shouldShowCorrectAlternative;
			} else {
				return true;
			}
		},
	},
};
</script>

<style scoped>
.score-bar {
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 16px 0;
}
.score-circles-container {
	/* 5 circles with 32px width + 4 16px gaps between */
	width: calc((40px * 5) + (16px * 4));
	margin-left: auto;
	margin-right: auto;

	display: grid;
	grid-auto-flow: column;
	column-gap: 16px;
}
.score-circle {
	display: inline-block;
	height: 40px;
	width: 40px;
	border: 2px solid white;
	border-radius: 50%;
	transition: var(--default-transition);
}

.score-circle.correct {
	background-color: var(--correct-answer-color);
	border-color: var(--correct-answer-border-color);
}
.score-circle.incorrect {
	background-color: var(--incorrect-answer-color);
	border-color: var(--incorrect-answer-border-color);
}
</style>