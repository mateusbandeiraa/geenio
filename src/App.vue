<template>
  <main-page/>
</template>

<script>
import 'normalize.css';
import MainPage from './pages/MainPage.vue';

export default {
  name: "App",
  components: {
    MainPage,
  },
};
</script>

<style>
:root{
  --main-bg-color: #031926;
  --main-color: #FFFFFA;
  --main-highlight-color: #F05D5E;
}
body {
  font-family: 'Exo 2', sans-serif;
  margin: 0;
  padding: 0 16px;
  border-top: 10px solid var(--main-highlight-color);
  background-color: var(--main-bg-color);
  color: var(--main-color);
}
</style>
