<template>
  <my-modal>
    <article>
      <h2>Sobre</h2>
      <p>O <b>geenio</b> é um jogo de perguntas e respostas.</p>
      <p>
        Responda corretamente às cinco perguntas selecionando uma das três
        opções.
      </p>
      <p>Todo dia, sempre à meia-noite, cinco novas perguntas são mostradas.</p>
      <hr />
      <p>
        Desenvolvido por
        <a href="https://mateusbandeira.dev" target="_blank">Mateus Bandeira</a>
      </p>
      <p>
        Perguntas com a contribuição de
        <a href="https://github.com/henriquebafilho" target="_blank"
          >Henrique Filho</a
        >
      </p>
    </article>
    <a
      href="https://simpleanalytics.com/?utm_source=geenio.bandeira.dev&utm_content=badge"
      referrerpolicy="origin"
      target="_blank"
      ><img
        src="https://simpleanalyticsbadges.com/geenio.bandeira.dev?mode=dark"
        loading="lazy"
        referrerpolicy="no-referrer"
        crossorigin="anonymous"
        height="50"
    /></a>
  </my-modal>
</template>

<script>
import MyModal from "./MyModal.vue";
export default {
  components: { MyModal },
};
</script>

<style scoped>
h2 {
  margin-top: 0;
  text-align: center;
}

article {
  margin-bottom: 16px;
}

article p {
  font-weight: 300;
}

article p b {
  font-weight: 00;
}

article hr {
  color: var(--main-color);
}

a:link,
a:visited {
  font-weight: 600;
  color: var(--main-color);
}
</style>
