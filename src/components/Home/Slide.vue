<template>
	<RouterLink :to="`news/${news.id}`" class="home__slide">
		<div class="home__slide-img">
			<img :src="`https://api.pharmiq.uz/files/news/${news.banner}`" alt="bg" />
		</div>
		<p class="home__slide-title" :style="textColor">
			{{ title }}
		</p>
	</RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import { textColor } from '../../composables/useColor';
import i18n from '../../locales';
const props = defineProps({
	news: Object,
});
const title = computed(() =>
	i18n.global.locale == 'ru' ? JSON.parse(props.news.title).ru : JSON.parse(props.news.title).uz
);
</script>

<style lang="scss" scoped>
.home__slide {
	cursor: pointer;
	width: 32rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}

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
		font-size: 1.6rem;
		font-weight: 400;
	}
	& p {
		margin-left: 1rem;
	}
}
</style>
