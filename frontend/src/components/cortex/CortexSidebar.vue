<template>
  <aside>
    <ul>
      <li>
        <my-button>
          <span> <BIconPatchQuestion class="button-icon" />Perguntas</span>
        </my-button>
      </li>
      <li>
        <my-button>
          <span> <BIconDice5 class="button-icon" />Partidas</span>
        </my-button>
      </li>
    </ul>
  </aside>
</template>

<script>
import MyButton from "../MyButton.vue";
import { BIconPatchQuestion, BIconDice5 } from "bootstrap-icons-vue";
export default {
  components: { MyButton, BIconPatchQuestion, BIconDice5 },
};
</script>
<style scoped>
aside {
  max-width: 250px;
}
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 4px;
}

button {
  display: block;
  width: 100%;
  border-radius: 10px;
}

.button-icon {
  font-size: 1.5em;
  margin: auto 5px;
}

button > span {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
