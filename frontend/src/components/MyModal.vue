<template>
  <div>
    <div
      class="modal-background"
      @click="$emit('closeRequested')"
    />
    <div class="modal">
      <my-button
        class="small close-button"
        @click="$emit('closeRequested')"
      >
        ✕
      </my-button>
      <slot />
    </div>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
  components: { MyButton },
  emits: ["closeRequested"],
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-flow: column;
  align-items: center;

  background-color: var(--main-bg-color-translucent);
  backdrop-filter: blur(2px);
  width: 600px;
  max-width: 90%;

  padding: 32px;
  padding-top: 48px;
  border: 3px solid var(--main-highlight-color);
  border-radius: 16px;

  /* So it always appears in front of .modal-background */
  z-index: 999;
}

.modal > .close-button {
  position: absolute;
  top: 16px;
  right: 16px;
}

.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  /* So it always appears behind .modal */
  z-index: 998;
}
</style>
