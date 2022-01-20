<template>
	<ol>
		<li value="3" id="question-text">Quantos cocos uma andorinha é capaz de carregar?</li>
	</ol>
	<div class="answer-block">
		<answer-button
			v-for="answerText in ['Uma', 'Duas', 'Três']"
			:key="answerText"
			:answerText="answerText"
		/>
	</div>
</template>

<script>
import AnswerButton from "./AnswerButton.vue";
export default {
	components: { AnswerButton },
};
</script>

<style>
#question-text {
    font-size: 1.75em;
}
.answer-block {
    padding-left: 40px;
	display: grid;
	grid-row-gap: 16px;
}
</style>