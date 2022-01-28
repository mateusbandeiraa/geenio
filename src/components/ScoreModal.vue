<template>
	<modal>
		<score-bar />
		<p>{{ totalCorrectAnswers }}/{{ totalQuestions }} acertos</p>
		<my-button @click="shareAction">
			<transition name="fadeoutonly" mode="out-in">
				<span v-if="copiedShareText">Texto copiado</span>
				<span v-else>compartilhar</span>
			</transition>
		</my-button>
		<p>Novas perguntas em {{ nextGameCountdown }}</p>
	</modal>
</template>

<script>
import dayjs from "dayjs";
import ScoreBar from "./ScoreBar.vue";
import Modal from "./MyModal.vue";
import MyButton from './MyButton.vue';
export default {
	components: { ScoreBar, Modal, MyButton },
	data: function () {
		return {
			copiedShareText: false,
			nextGameCountdown: "",
			countdownHandle: null,
		};
	},
	methods: {
		shareAction() {
			if (navigator.share) {
				navigator.share({ text: this.shareText });
			} else {
				navigator.clipboard.writeText(this.shareText).then(() => {
					this.copiedShareText = true;
					setTimeout(() => {
						this.copiedShareText = false;
					}, 2000);
				});
			}
		},
		updateCountdown() {
			const nextGameDate = this.$store.state.questions.nextGameDate;
			let remaining = dayjs.duration(nextGameDate.diff(dayjs()));
			if (remaining.asMilliseconds() < 0) {
				remaining = dayjs.duration(0);
			}
			this.nextGameCountdown = remaining
				.locale("pt-br")
				.format("HH[h] mm[m] ss[s]") //
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
		shareText() {
			return `joguei geenio n°${this.gameNumber} ${this.totalCorrectAnswers}/${this.totalQuestions}\n\n${this.scoreCircles}\n\nhttps://geenio.bandeira.dev`;
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
p {
	font-size: 1.75em;
	text-align: center;
}

.modal > p:last-of-type {
	margin-bottom: 0;
}
</style>
