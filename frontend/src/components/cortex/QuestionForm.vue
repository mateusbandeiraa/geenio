<template>
  <form>
    <label for="questionID">ID</label>
    <input
      id="questionID"
      v-model="question.id"
      type="text"
      disabled
    >
    <label for="questionText">Texto</label>
    <input
      id="questionText"
      v-model="question.text"
      type="text"
    >
    <label for="questionAlternatives">Alternativas</label>
    <div class="alternatives-container">
      <div
        v-for="(alternative, index) in question.alternatives"
        :key="index"
        class="alternative-formgroup"
      >
        <input
          :id="`questionText_${index}`"
          v-model="question.alternatives[index]"
          type="text"
        >
        <div class="radio-group">
          <input
            :id="`radioCorrect_${index}`"
            v-model="question.correctAlternative"
            :value="alternative"
            type="radio"
          >
          <label :for="`radioCorrect_${index}`">Alternativa correta</label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Question from "../../model/NewQuestion";
export default {
  data: function () {
    return {
      question: new Question({
        id: "id1234",
        text: "texto da pergunta",
        alternatives: ["Alternativa A", "Alternativa B", "Alternativa C"],
        correctAlternative: "Alternativa B"
      }),
    };
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;
  row-gap: 8px;
  align-items: center;
}

form > label {
  text-align: right;
}

label[for="questionAlternatives"] {
  align-self: flex-start;
}

.alternatives-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 4px;
}

.alternative-formgroup {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 16px;
  align-items: center;
}

.radio-group > label {
  margin-left: 6px;
}
</style>