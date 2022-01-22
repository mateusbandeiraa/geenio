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
	border: 2px solid var(--main-color);
	border-radius: 32px;
	display: inline-block;
	padding: 1rem 2rem;
	margin: 0;
	text-decoration: none;
	text-align: center;
	background-color: var(--main-bg-color-translucent);
	color: var(--main-color);
	font-size: 1rem;
	cursor: pointer;
	transition: var(--default-transition);
	-webkit-appearance: none;
	-moz-appearance: none;
}

button:hover,
button:focus {
	background: var(--main-bg-hover-color-translucent);
}

button:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
}

button:active {
	transform: scale(0.99);
}
</style>