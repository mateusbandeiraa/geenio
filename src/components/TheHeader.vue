<template>
	<div class="header">
		<my-button
			id="show-about-button"
			class="small header-button"
			@click="shouldShowAboutModal = true"
			aria-label="Sobre"
		>
			<BIconQuestionLg />
		</my-button>
		<teleport to="body">
			<transition name="fade">
				<keep-alive>
					<about-modal
						@closeRequested="shouldShowAboutModal = false"
						v-if="shouldShowAboutModal"
					/>
				</keep-alive>
			</transition>
		</teleport>
		<h1 id="title">geenio</h1>
		<transition name="fade">
			<my-button
				v-if="shouldShowScoreButton"
				id="show-score-button"
				class="small header-button"
				@click="$emit('requestShowScore')"
				aria-label="Pontuação"
			>
				<BIconBarChartFill />
			</my-button>
		</transition>
	</div>
</template>

<script>
import MyButton from "./MyButton.vue";
import { BIconQuestionLg, BIconBarChartFill } from "bootstrap-icons-vue";
import AboutModal from "./AboutModal.vue";
export default {
	components: { MyButton, BIconQuestionLg, BIconBarChartFill, AboutModal },
	data: function () {
		return {
			shouldShowAboutModal: false,
		};
	},
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
	font-size: 1.2rem;
	line-height: 0;
	border: 2px solid var(--main-color);
}

#show-about-button {
	grid-column-start: 1;
	justify-self: start;
}

#show-score-button {
	grid-column-start: 3;
	justify-self: end;
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