<template>
  <my-panel>
    <h2>Criar Pergunta</h2>
    <question-form />
  </my-panel>
</template>

<script>
import MyPanel from "../MyPanel.vue";
import QuestionForm from "./QuestionForm.vue";
export default {
  components: { QuestionForm, MyPanel },
};
</script>

<style>
h2 {
    text-align: center;
}
</style>