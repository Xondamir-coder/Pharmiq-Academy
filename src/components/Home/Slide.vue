<template>
	<div class="home__slide">
		<img :src="props.img" alt="bg" />
		<h1 class="home__slide-title">{{ props.title }}</h1>
		<p class="home__slide-text">{{ props.text }}</p>
	</div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>

<style lang="scss" scoped>
.home__slide {
	min-width: 32rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	& img {
		width: 100%;
		height: 18rem;
		object-fit: cover;
	}
	&-title {
		margin-left: 1rem;
		font-size: 1.6rem;
		font-weight: 400;
	}
	& p {
		margin-left: 1rem;
	}
}
</style>
