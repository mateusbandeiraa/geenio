<template>
	<button @click="goToNextQuestion">Próxima pergunta →</button>
</template>

<script>
export default {
	props: {},
	computed: {
		isLastQuestion() {
			return this.$store.getters.isLastQuestion;
		},
	},
	methods: {
		goToNextQuestion() {
			this.$store.commit("incrementCurrentQuestion");
		},
	},
};
</script>

<style scoped>
/* Reset button styles. From: https://css-tricks.com/overriding-default-button-styles */
button {
	background-color: var(--main-bg-color-translucent);
}

button:hover,
button:focus {
	background: var(--main-bg-hover-color-translucent);
}
</style>