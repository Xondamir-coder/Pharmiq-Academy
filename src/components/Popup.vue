<template>
	<Teleport to="body" name="fade">
		<div @click="emitToggle" class="overlay" v-if="success"></div>
		<Transition name="fade">
			<div class="popup" v-if="success" v-bind="$attrs">
				<div class="popup__content">
					<slot name="content"></slot>
				</div>
				<slot name="btn"></slot>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
const props = defineProps({
	success: Boolean,
});
defineOptions({
	inheritAttrs: false,
});
const emit = defineEmits(['toggle']);
const emitToggle = function () {
	emit('toggle', event.target.nextElementSibling.dataset.popup);
};
</script>

<style scoped>
.fade-leave-active,
.fade-enter-active {
	transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	transform: translate(-50%, -50%) scale(0.8);
	opacity: 0;
}
</style>
