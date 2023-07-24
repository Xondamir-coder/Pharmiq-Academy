<template>
	<div class="home__slide">
		<img :src="props.img" alt="bg" />
		<h3 class="home__slide-title">{{ props.title }}</h3>
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
	@media only screen and (max-height: 740px) {
	}
	& img {
		width: 100%;
		height: 18rem;
		border-radius: 1rem;
		@media only screen and (max-height: 740px) {
			height: 25vh;
		}
		object-fit: cover;
	}
	&-title {
		margin-left: 1rem;
		font-weight: 400;
	}
	& p {
		margin-left: 1rem;
	}
}
</style>
