<template>
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
export default {
  data: function () {
    return {
      page: 0,
      pageSize: 10,
      questions: [],
      isLoading: false,
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
  },
};
</script>

<style scoped>
</style>