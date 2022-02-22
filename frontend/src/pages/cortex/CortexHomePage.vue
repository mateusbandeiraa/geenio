<template>
  <el-row>
    <el-col :span="24">
      <h1>Bem-vindo à Home-Page do Córtex</h1>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="4">
      <cortex-sidebar />
    </el-col>
    <el-col :span="20">
      <component :is="currentPanel" />
    </el-col>
  </el-row>
</template>

<script>
import CortexSidebar from "../../components/cortex/CortexSidebar.vue";
import QuestionsPanel from "../../components/cortex/QuestionsPanel.vue";
export default {
  components: { CortexSidebar, QuestionsPanel },
  data: function () {
    return {
      currentPanel: "QuestionsPanel",
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
