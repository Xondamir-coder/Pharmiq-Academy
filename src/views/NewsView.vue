<template>
	<div class="news">
		<img :style="bannerAppear" :src="bannerUrl" alt="news bg" />
		<h2 :style="[textColor, titleAppear]">{{ title }}</h2>
		<div :style="[textColor, titleAppear]" v-html="desc"></div>
		<RouterLink to="/" class="custom__button" :style="titleAppear">Назад</RouterLink>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '../appStore';
import { textColor } from '../composables/useColor';
import useAppear from '../composables/useAppear';

const appStore = useAppStore();
const route = useRoute();
const news = ref({});
const showNews = ref(false);

news.value = appStore.news.find((obj) => obj.id == route.params.id);

const bannerAppear = computed(() => ({
	opacity: showNews.value ? '1' : '0',
	transform: showNews.value ? 'scale(1)' : 'scale(.9)',
}));
const titleAppear = computed(() => ({
	opacity: showNews.value ? '1' : '0',
	transform: showNews.value ? 'translateX(0)' : 'translateX(-20rem)',
}));
const bannerUrl = computed(() => `https://api.pharmiq.uz/files/news/${news.value.banner}`);
const title = computed(() => JSON.parse(news.value.title).ru);
const desc = computed(() => JSON.parse(news.value.content).ru);
onMounted(() => useAppear(showNews));
</script>

<style lang="scss" scoped>
.news {
	padding: 2rem 0;
	padding-right: 2rem;
	margin-right: 2rem;
	height: 100vh;
	overflow-y: auto;

	display: flex;
	flex-direction: column;
	gap: 3rem;
	&::-webkit-scrollbar {
		display: none;
	}
	& h2 {
		transition: all 1s;
		font-size: 2rem;
		font-weight: 600;
	}
	& img {
		transition: all 0.6s;
		object-fit: cover;
		width: 100%;
		height: 45rem;
		border-radius: 1.5rem;
		background: lightgray 0px 0.349px / 100% 123.629% no-repeat;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
	}
	& div {
		transition: all 1s 0.5s;
	}
	& a {
		color: #fff;
		width: 12rem;
		align-self: flex-start;
		transition: all 1s 1s;
	}
}
</style>
