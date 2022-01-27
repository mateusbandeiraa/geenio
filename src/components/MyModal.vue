<template>
	<div class="modal">
		<my-button @click="$emit('closeRequested')" class="close-button">✕</my-button>
		<slot />
	</div>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
	components: { MyButton },
	emits: ['closeRequested']
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
}

.modal > .close-button {
	position: absolute;
	top: 16px;
	right: 16px;

	border: none;
	padding: 8px;
	width: 32px;
	height: 32px;
	border-radius: 8px;
}
</style>