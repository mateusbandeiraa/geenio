<template>
	<div class="modal">
		<score-bar />
		<p>{{ totalCorrectAnswers }}/{{ totalQuestions }} acertos</p>
		<a>compartilhar</a>
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
	},
};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background-color: hsla(202, 85%, 8%, 0.9);
	backdrop-filter: blur(2px);
	width: 600px;
	max-width: 90%;

	/* height: 300px; */
	max-height: 60%;

	padding: 32px;
	border: 3px solid var(--main-highlight-color);
	border-radius: 16px;
}
p {
	font-size: 1.75em;
	text-align: center;
}
</style>