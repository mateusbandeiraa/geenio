<template>
  <el-row>
    <el-col :span="20">
      <h2>Perguntas</h2>
    </el-col>
    <el-col
      :span="4"
      size="large"
    >
      <my-button @click="showNewQuestionModal">
        Nova pergunta
      </my-button>
      <transition name="fade">
        <edit-question-modal
          v-if="isShowingEditQuestionModal"
          @closeRequested="handleEditQuestionModalCloseRequested"
          @questionCreated="handleQuestionCreated"
        />
      </transition>
    </el-col>
  </el-row>
  <el-skeleton
    :loading="isLoading"
    :rows="5"
    :animated="true"
  >
    <template #default>
      <el-table
        :stripe="true"
        :data="questions"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="Id"
        />
        <el-table-column
          prop="text"
          label="Texto"
        />
        <el-table-column
          prop="alternatives"
          label="Alternativas"
        />
        <el-table-column
          prop="correctAlternative"
          label="Alternativa Correta"
        />
        <el-table-column
          prop="createTime"
          label="Criada em"
        />
      </el-table>
    </template>
  </el-skeleton>
  <el-pagination
    :background="true"
    layout="prev, pager, next, jumper, total, sizes"
    :total="questions.length"
    @size-change="handlePageSizeChange"
    @page-change="handlePageChange"
  />
</template>

<script>
import EditQuestionModal from "./EditQuestionModal.vue";
export default {
  components: { EditQuestionModal },
  data: function () {
    return {
      page: 0,
      pageSize: 10,
      questions: [],
      isLoading: false,
      isShowingEditQuestionModal: false,
    };
  },
  watch: {
    page: function () {
      this.loadData();
    },
    pageSize: function () {
      this.loadData();
    },
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    loadData() {
      this.isLoading = true;
      this.$http
        .get(`/cortex/question?page=${this.page}&pageSize=${this.pageSize}`)
        .then((response) => (this.questions = response.data.content))
        .catch()
        .then(() => {
          this.isLoading = false;
        });
    },
    handlePageSizeChange(newSize) {
      this.pageSize = newSize;
    },
    handlePageChange(newPage) {
      this.page = newPage;
    },
    showNewQuestionModal() {
      this.isShowingEditQuestionModal = true;
    },
    handleEditQuestionModalCloseRequested() {
      this.isShowingEditQuestionModal = false;
    },
    handleQuestionCreated() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
</style>