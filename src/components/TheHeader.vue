<template>
	<div class="header">
		<my-button id="show-about-button" class="small header-button"
			><BIconQuestionLg
		/></my-button>
		<h1 id="title">geenio</h1>
		<transition name="fade">
			<my-button
				v-if="shouldShowScoreButton"
				id="show-score-button"
				class="small header-button"
				@click="$emit('requestShowScore')"
			>
				<BIconBarChartFill />
			</my-button>
		</transition>
	</div>
</template>

<script>
import MyButton from "./MyButton.vue";
import { BIconQuestionLg, BIconBarChartFill } from "bootstrap-icons-vue";
export default {
	components: { MyButton, BIconQuestionLg, BIconBarChartFill },
	props: {
		shouldShowScoreButton: { type: Boolean, default: false },
	},
	emits: ["requestShowScore"],
};
</script>

<style scoped>
.header {
	display: grid;
	align-items: center;
	justify-items: center;
	grid-template-columns: 64px auto 64px;
}
.header > #title {
	grid-column-start: 2;
	text-align: center;
}

.header > .header-button {
	width: 36px;
	height: 36px;
	border: 2px solid var(--main-color);
}

#show-about-button {
	grid-column-start: 1;
}

#show-score-button {
	grid-column-start: 3;
}

/* Need to redefine this here because it wouldn't work on buttons otherwise.*/
.fade-enter-active,
.fade-leave-active {
	transition: opacity 250ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>