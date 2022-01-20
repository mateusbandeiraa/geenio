<template>
	<p id="question-text">{{ question.text }}</p>
	<div class="answer-block">
		<answer-button
			v-for="alternative in question.alternatives"
			:key="alternative"
			:text="alternative"
		/>
	</div>
</template>

<script>
import AnswerButton from "./AnswerButton.vue";
export default {
	components: { AnswerButton },
	props: {
		question: { type: Object, required: true },
	},
};
</script>

<style scoped>
#question-text {
	font-size: 1.75em;
}
.answer-block {
	display: grid;
	row-gap: 16px;
}
</style>