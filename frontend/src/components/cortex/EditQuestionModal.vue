<template>
  <my-modal class="edit-question-modal">
    <h1 v-if="isCreateMode">
      Nova pergunta
    </h1>
    <h1 v-else>
      Editar pergunta
    </h1>
    <question-form
      :question="question"
      @submit.prevent="handleFormSubmit"
    />
  </my-modal>
</template>

<script>
import MyModal from "../MyModal.vue";
import Question from "../../model/NewQuestion";
import QuestionForm from "./QuestionForm.vue";
export default {
  components: { MyModal, QuestionForm },
  props: {
    question: Question,
  },
  emits: ["questionCreated"],
  computed: {
    isCreateMode() {
      return !(this.question && this.question.id);
    },
  },
  methods: {
    handleFormSubmit() {
      if (this.isCreateMode) {
        this.createQuestion();
      } else {
        this.saveQuestion();
      }
    },
    createQuestion() {
      if (this.shuffleOnSave) {
        this.shuffleAlternatives();
      }
      this.$http
        .post("/cortex/question", this.question)
        .then(() => {
          this.formMessage = "Pergunta criada.";
          this.$emit("questionCreated", this.question);
        })
        .catch((error) => {
          this.formMessage = `Ocorreu um erro. ${error.message}`;
          console.error(error);
        });
    },
    saveQuestion() {
      // placeholder
    },
  },
};
</script>

<style>
.edit-question-modal .modal {
  width: 800px;
}
</style>