<template>
	<section class="store">
		<div>
			<h1>{{ i18n.global.t('in_dev') }}</h1>
			<img src="../assets/in-dev.svg" alt="development process" />
		</div>
	</section>
</template>

<script setup>
import i18n from '../locales';
</script>

<style lang="scss" scoped>
.store {
	height: 100%;
	display: grid;
	place-items: center;
}
div {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 4.2rem;
}
h1 {
	font-size: 3rem;
	font-weight: 600;
	background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
