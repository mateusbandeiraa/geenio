<template>
  <my-modal class="edit-question-modal">
    <h1>Nova pergunta</h1>
    <question-form @questionCreated="handleQuestionCreated" />
  </my-modal>
</template>

<script>
import MyModal from "../MyModal.vue";
import Question from "../../model/NewQuestion";
import QuestionForm from "./QuestionForm.vue";
export default {
  components: { MyModal, QuestionForm },
  props: {
    isCreateMode: { type: Boolean, default: true },
    question: { type: Question, default: new Question() },
  },
  emits: ["questionCreated"],
  methods: {
    handleQuestionCreated(event) {
      this.$emit("questionCreated", event);
    },
  },
};
</script>

<style>
.edit-question-modal .modal {
  width: 800px;
}
</style>