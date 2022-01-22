<template>
	<div class="modal">
		<score-bar />
		<p>{{ totalCorrectAnswers }}/{{ totalQuestions }} acertos</p>
		<a
			:href="'https://twitter.com/intent/tweet?text=' + tweetText"
			target="_blank"
			>compartilhar</a
		>
		<p>Novas perguntas em {{ nextGameCountdown }}</p>
	</div>
</template>

<script>
import dayjs from "dayjs";
import ScoreBar from "./ScoreBar.vue";
export default {
	components: { ScoreBar },
	data: function () {
		return {
			nextGameCountdown: "",
			countdownHandle: null,
		};
	},
	methods: {
		updateCountdown() {
			const nextGameDate = this.$store.state.questions.nextGameDate;
			let remaining = dayjs.duration(nextGameDate.diff(dayjs()));
			if (remaining.asMilliseconds() < 0) {
				remaining = dayjs.duration(0);
			}
			this.nextGameCountdown = remaining
				.locale("pt-br")
				.format("H[h] m[m] s[s]") //
				.replaceAll(" ", "\xa0"); // So that the whole countdown is shown in the same line.
		},
	},
	computed: {
		gameNumber() {
			return new String(this.$store.state.questions.gameNumber).padStart(
				2,
				"0"
			);
		},
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
				`joguei geenio n°${this.gameNumber} ${this.totalCorrectAnswers}/${this.totalQuestions}\n\n${this.scoreCircles}\n\ngeenio.bandeira.dev`
			);
		},
	},
	beforeMount: function () {
		this.updateCountdown();

		this.countdownHandle = setInterval(() => {
			this.updateCountdown();
		}, 1000);
	},
	beforeUnmount: function () {
		clearInterval(this.countdownHandle);
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

	background-color: var(--main-bg-color-translucent);
	backdrop-filter: blur(2px);
	width: 600px;
	max-width: 90%;

	padding: 32px;
	border: 3px solid var(--main-highlight-color);
	border-radius: 16px;
}
p {
	font-size: 1.75em;
	text-align: center;
}

.modal > p:last-of-type {
	margin-bottom: 0;
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