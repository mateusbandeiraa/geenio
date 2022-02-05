<template>
  <div class="main-container">
    <h1>Bem-vindo à Home-Page do Córtex</h1>
    <div class="main-content">
      <cortex-sidebar />
      <component :is="currentPanel" />
    </div>
  </div>
</template>

<script>
import CortexSidebar from "../../components/cortex/CortexSidebar.vue";
import CreateQuestionPanel from "../../components/cortex/CreateQuestionPanel.vue";
export default {
  components: { CortexSidebar, CreateQuestionPanel },
  data: function () {
    return {
      currentPanel: "CreateQuestionPanel",
    };
  },
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

.main-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
