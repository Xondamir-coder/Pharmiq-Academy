<template>
	<div class="home__slide">
		<div class="home__slide-img">
			<img :src="`https://api.pharmiq.uz/files/news/${news.banner}`" alt="bg" />
		</div>
		<h3 class="home__slide-title" :style="textColor">Lorem ipsum doler amet</h3>
		<div class="home__slide-text" :style="textColor">Some description ...</div>
	</div>
</template>

<script setup>
import { textColor } from '../../composables/useColor';
const props = defineProps({
	news: Object,
});
</script>

<style lang="scss" scoped>
.home__slide {
	width: 32rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&-img {
		width: 100%;
		height: 18rem;
		@media only screen and (max-height: 740px) {
			height: 25vh;
		}

		border-radius: 2rem;
		background: var(
			--brand-gradient-s-pink-s-green,
			linear-gradient(108deg, #f0b4aa 0%, #4db1b1 103.01%)
		);
		& img {
			border-radius: 1.5rem;
			object-fit: cover;
			width: 100%;
			height: 100%;
			border-radius: 1.5rem;
			background: lightgray 0px -8.024px / 100% 135.405% no-repeat;
			box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
		}
	}
	&-title {
		font-weight: 400;
	}
	& p {
		margin-left: 1rem;
	}
}
</style>
