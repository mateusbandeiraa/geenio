<template>
  <div class="main-container">
    <h1>Bem-vindo à Home-Page do Córtex</h1>
    <cortex-sidebar />
    <question-form />
  </div>
</template>

<script>
import CortexSidebar from "../../components/cortex/CortexSidebar.vue";
import QuestionForm from "../../components/cortex/QuestionForm.vue";
export default {
  components: { CortexSidebar, QuestionForm },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.main-container {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
</style>
