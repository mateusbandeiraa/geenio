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
* {
  box-sizing: border-box;
}
:root{
  --main-bg-color: #031926;
  --main-color: #FFFFFA;
  --main-highlight-color: #F05D5E;
  
  --correct-answer-color: hsl(108, 66%, 63%);
  --correct-answer-border-color: hsl(108, 66%, 32%);
  --incorrect-answer-color: hsl(0, 83%, 52%);
  --incorrect-answer-border-color: hsl(0, 83%, 32%);
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
