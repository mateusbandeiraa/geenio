<template>
	<ol>
		<li value="3" id="question-text">
			<p>Quantos cocos uma andorinha é capaz de carregar?</p>
			<div class="answer-block">
				<answer-button
					v-for="answerText in ['Uma', 'Duas', 'Três']"
					:key="answerText"
					:answerText="answerText"
				/>
			</div>
		</li>
	</ol>
</template>

<script>
import AnswerButton from "./AnswerButton.vue";
export default {
	components: { AnswerButton },
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