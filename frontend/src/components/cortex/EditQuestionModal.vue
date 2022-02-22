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
      :is-create-mode="isCreateMode"
      @submit="handleFormSubmit"
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
    handleFormSubmit(question) {
      if (this.isCreateMode) {
        this.createQuestion(question);
      } else {
        this.saveQuestion(question);
      }
    },
    createQuestion(question) {
      this.$http
        .post("/cortex/question", question)
        .then(() => {
          this.formMessage = "Pergunta criada.";
          this.$emit("questionCreated", question);
        })
        .catch((error) => {
          this.formMessage = `Ocorreu um erro. ${error.message}`;
          console.error(error);
        });
    },
    saveQuestion(question) {
        this.$http
        .put("/cortex/question", question)
        .then(() => {
          this.formMessage = "Pergunta criada.";
          this.$emit("questionCreated", question);
        })
        .catch((error) => {
          this.formMessage = `Ocorreu um erro. ${error.message}`;
          console.error(error);
        });
    },
  },
};
</script>

<style>
.edit-question-modal .modal {
  width: 800px;
}
</style>