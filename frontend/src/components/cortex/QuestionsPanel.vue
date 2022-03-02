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
          :question="activeQuestion"
          @closeRequested="handleEditQuestionModalCloseRequested"
          @questionCreated="handleQuestionCreated"
        />
      </transition>
    </el-col>
  </el-row>

  <el-table
    :stripe="true"
    :data="questions"
    style="width: 100%"
  >
    <el-table-column
      prop="id"
      label="Id"
      min-width="100"
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
    <el-table-column
      :fixed="right"
      label="Ações"
    >
      <template #header>
        <el-input
          v-model="questionSearchTerm"
          size="small"
          placeholder="Digite para buscar"
        />
      </template>
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="handleEditQuestion(scope.$index)"
        >
          Editar
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    :background="true"
    layout="prev, pager, next, jumper, total, sizes"
    :total="totalQuestions"
    @size-change="handlePageSizeChange"
    @current-change="handlePageChange"
  />
</template>

<script>
import EditQuestionModal from "./EditQuestionModal.vue";
import Question from "../../model/NewQuestion";

import { debounce } from "debounce";

export default {
  components: { EditQuestionModal },
  data: function () {
    return {
      page: 1,
      pageSize: 10,
      questions: [],
      totalQuestions: 0,
      isLoading: false,
      requestAbortController: null,
      isShowingEditQuestionModal: false,
      activeQuestion: null,
      questionSearchTerm: "",
    };
  },
  watch: {
    page: function () {
      this.loadData();
    },
    pageSize: function () {
      this.loadData();
    },
    questionSearchTerm: debounce(function() {this.loadData()}, 300),
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.requestAbortController) {
        this.requestAbortController.abort();
      }
      this.isLoading = true;
      this.requestAbortController = new AbortController();

      const params = new URLSearchParams({
        page: this.page - 1,
        pageSize: this.pageSize,
        searchTerm: this.questionSearchTerm,
      });
      this.$http
        .get(`/cortex/question?${params.toString()}`, {
          signal: this.requestAbortController.signal,
        })
        .then((response) => {
          this.questions = response.data.content;
          this.totalQuestions = response.data.totalElements;
        })
        .catch(() => {})
        .then(() => {
          this.isLoading = false;
        });
    },
    handlePageSizeChange(newSize) {
      this.pageSize = newSize;
      this.loadData();
    },
    handlePageChange(newPage) {
      this.page = newPage;
      this.loadData();
    },
    showNewQuestionModal() {
      this.activeQuestion = new Question({
        id: null,
        text: null,
        alternatives: ["", "", ""],
        correctAlternative: null,
      });
      this.isShowingEditQuestionModal = true;
    },
    handleEditQuestionModalCloseRequested() {
      this.isShowingEditQuestionModal = false;
    },
    handleQuestionCreated() {
      this.activeQuestion = new Question({
        id: null,
        text: null,
        alternatives: ["", "", ""],
        correctAlternative: null,
      });
      this.loadData();
      this.isShowingEditQuestionModal = false;
    },
    handleEditQuestion(index) {
      const question = this.questions[index];
      this.activeQuestion = question;
      this.isShowingEditQuestionModal = true;
    },
  },
};
</script>

<style scoped>
</style>