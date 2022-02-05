<template>
  <my-button @click="goToNextQuestion">Próxima pergunta →</my-button>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
  components: { MyButton },
  props: {},
  computed: {
    isLastQuestion() {
      return this.$store.getters.isLastQuestion;
    },
  },
  methods: {
    goToNextQuestion() {
      this.$store.commit("incrementCurrentQuestion");
    },
  },
};
</script>

<style scoped>
/* Reset button styles. From: https://css-tricks.com/overriding-default-button-styles */
button {
  background-color: var(--main-bg-color-translucent);
}

button:hover,
button:focus {
  background: var(--main-bg-hover-color-translucent);
}
</style>
