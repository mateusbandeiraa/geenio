<template>
	<main-page />
</template>

<script>
import "normalize.css";
import MainPage from "./pages/MainPage.vue";

export default {
	name: "App",
	components: {
		MainPage,
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');
* {
	box-sizing: border-box;
}
:root {
	--main-bg-color: #031926;
	--main-color: #fffffa;
	--main-highlight-color: #f05d5e;

	--selected-answer-color: hsl(191, 33%, 32%);
	--selected-answer-border-color: hsl(191, 33%, 52%);
	--correct-answer-color: hsl(108, 66%, 52%);
	--correct-answer-border-color: hsl(108, 66%, 16%);
	--incorrect-answer-color: hsl(0, 83%, 52%);
	--incorrect-answer-border-color: hsl(0, 83%, 32%);

	--default-transition: background 250ms ease-in-out, color 150ms ease-in-out, transform 150ms ease;
}
body {
	font-family: "Exo 2", sans-serif;
	margin: 0;
	padding: 0 16px;
	border-top: 10px solid var(--main-highlight-color);
	background-color: var(--main-bg-color);
	color: var(--main-color);
}
</style>
