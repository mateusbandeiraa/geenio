<template>
	<button>{{ text }}</button>
</template>

<script>
export default {
	props: {
		text: { type: String, required: true },
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
	text-align: left;
	background: transparent;
	color: var(--main-color);
	font-size: 1rem;
	cursor: pointer;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
}

button:hover,
button:focus {
	background: rgba(255, 255, 255, 0.15)
}

button:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
}

button:active {
	transform: scale(0.99);
}
</style>