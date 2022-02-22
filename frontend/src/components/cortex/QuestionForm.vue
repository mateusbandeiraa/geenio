<template>
  <form>
    <label for="questionID">ID</label>
    <input
      id="questionID"
      v-model="localQuestion.id"
      type="text"
      disabled
    >
    <label for="questionText">Texto</label>
    <input
      id="questionText"
      v-model="localQuestion.text"
      type="text"
      required
      maxlength="70"
    >
    <label for="questionAlternatives">Alternativas</label>
    <div class="alternatives-container">
      <div
        v-for="(alternative, index) in localQuestion.alternatives"
        :key="index"
        class="alternative-formgroup"
      >
        <input
          :id="`questionText_${index}`"
          v-model="localQuestion.alternatives[index]"
          type="text"
          maxlength="30"
        >
        <div class="input-group">
          <input
            :id="`radioCorrect_${index}`"
            v-model="correctAlternativeIndex"
            :value="index"
            type="radio"
          >
          <label :for="`radioCorrect_${index}`">Alternativa correta</label>
        </div>
      </div>
      <div class="input-group shuffle-options">
        <my-button
          id="shuffle-alternatives-btn"
          @click.prevent="manualShuffle"
        >
          Embaralhar alternativas
        </my-button>
        <input
          id="shuffle-alternatives-on-save-checkbox"
          v-model="shuffleOnSave"
          type="checkbox"
          @input="shouldShuffleNext = $event.target.checked"
        >
        <label
          for="shuffle-alternatives-on-save-checkbox"
        >Embaralhar alternativas ao salvar</label>
      </div>
    </div>
    <my-button type="submit">
      Salvar
    </my-button>
    <p
      v-if="formMessage"
      class="form-message"
    >
      {{ formMessage }}
    </p>
  </form>
</template>

<script>
import { shuffle } from "shuffle-seed";
import Question from "../../model/NewQuestion";
import MyButton from "../MyButton.vue";
export default {
  components: { MyButton },
  props: {
    question: Question,
  },
  emits: ["questionCreated"],
  data: function () {
    return {
      localQuestion: this.question,
      correctAlternativeIndex: 0,
      /* When the user hits the manual shuffle button, it sets shuffleOnSave to false.
      This happens so the alternatives are not shuffled again on saving. 
      But after the saving is done, "shouldShuffleNext" stores the original state of 
      the shuffle checkbox and restores it.*/
      shuffleOnSave: true,
      shouldShuffleNext: true,
      formMessage: null,
    };
  },
  computed: {
    alternatives() {
      return this.localQuestion.alternatives;
    },
  },
  watch: {
    question: {
      deep: true,
      handler() {
        this.localQuestion = this.question;
      },
    },
    correctAlternativeIndex() {
      this.updateCorrectAlternativeField();
    },
    alternatives: {
      handler: function () {
        this.updateCorrectAlternativeField();
      },
      deep: true,
    },
  },
  methods: {
    updateCorrectAlternativeField() {
      this.localQuestion.correctAlternative =
        this.localQuestion.alternatives[this.correctAlternativeIndex];
    },
    clearForm() {
      this.localQuestion = new Question({
        id: null,
        text: null,
        alternatives: ["", "", ""],
        correctAlternative: null,
      });
      this.correctAlternativeIndex = 0;

      if (this.shouldShuffleNext) {
        this.shuffleOnSave = true;
      }
    },
    manualShuffle() {
      this.shuffleOnSave = false;
      this.shuffleAlternatives();
    },
    shuffleAlternatives() {
      let shuffledAlternatives = this.question.alternatives;
      const correctAlternative = this.question.correctAlternative;
      do {
        shuffledAlternatives = shuffle(this.alternatives, Math.random());
      } while (shuffledAlternatives === this.question.alternatives);

      this.localQuestion.alternatives = shuffledAlternatives;
      this.correctAlternativeIndex =
        this.question.alternatives.indexOf(correctAlternative);
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 150px auto;
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

.input-group > label {
  margin-left: 6px;
}

form button[type="submit"] {
  grid-column: 1 / span 2;
  max-width: 300px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
}

form .form-message {
  grid-column: 1 / span 2;
  text-align: center;
}
.shuffle-options {
  margin-top: 8px;
}
#shuffle-alternatives-btn {
  height: 32px;
  line-height: 0;
  margin: 0 8px;
}
</style>