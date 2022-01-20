<template>
	<div class="modal">
		<score-bar />
		<p>{{ totalCorrectAnswers }}/{{ totalQuestions }} acertos</p>
		<a
			:href="'https://twitter.com/intent/tweet?text=' + tweetText"
			target="_blank"
			>compartilhar</a
		>
	</div>
</template>

<script>
import ScoreBar from "./ScoreBar.vue";
export default {
	components: { ScoreBar },
	computed: {
		totalCorrectAnswers() {
			return this.$store.getters.getTotalCorrectAnswers;
		},
		totalQuestions() {
			return this.$store.state.questions.questions.length;
		},
		scoreCircles() {
			const questions = this.$store.getters.getQuestions;
			return questions
				.map((question) => {
					return question.isAnswered &&
						question.isSelectedAlternativeCorrect
						? "🟢"
						: "🔴";
				})
				.join("");
		},
		tweetText() {
			return encodeURI(
				`joguei geenio n°1 ${this.totalCorrectAnswers}/${this.totalQuestions}\n${this.scoreCircles}\n\ngeenio.bandeira.dev`
			);
		},
	},
};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-flow: column;
	align-items: center;

	background-color: hsla(202, 85%, 8%, 0.9);
	backdrop-filter: blur(2px);
	width: 600px;
	max-width: 90%;

	max-height: 60%;

	padding: 32px;
	border: 3px solid var(--main-highlight-color);
	border-radius: 16px;
}
p {
	font-size: 1.75em;
	text-align: center;
}
a {
	font-size: 1.5em;
	text-decoration: none;
	color: var(--main-color);
	background-color: var(--main-bg-color);
	border: 2px solid var(--main-color);
	padding: 8px 16px;
	border-radius: 32px;
	transition: var(--default-transition);
}
a:hover,
a:focus {
	background: rgba(255, 255, 255, 0.15);
}
</style>