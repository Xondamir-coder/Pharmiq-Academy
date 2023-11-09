<template>
	<section class="home" :style="showHome">
		<div class="home__head">
			<h1 :style="textColor" class="home__username">
				{{ i18n.global.t('home_title') }}, {{ appStore.user.firstName }}!
			</h1>
			<p class="home__date" :style="textColor">{{ getCurrentDate() }}</p>
		</div>

		<div class="home__slider">
			<Slide v-for="news in appStore.news" :key="news.id" :news="news" />
		</div>

		<div class="home__leaders">
			<h1 :style="textColor">{{ i18n.global.t('board_title') }}</h1>
			<div>
				<div class="home__leaders-box">
					<p class="home__leaders-title">{{ i18n.global.t('board_place') }}</p>
					<p class="home__leaders-title">{{ i18n.global.t('board_name') }}</p>
					<p class="home__leaders-title">{{ i18n.global.t('board_pharmacy') }}</p>
					<p class="home__leaders-title">{{ i18n.global.t('board_stat') }}</p>
				</div>

				<div v-for="(user, id) in appStore.leaders" :key="id" class="home__leaders-box">
					<p class="home__leaders-detail">{{ id + 1 }}</p>
					<p class="home__leaders-detail">{{ user.user }}</p>
					<p class="home__leaders-detail">{{ user.company }}</p>
					<p class="home__leaders-detail">{{ user.iqc }} <Coin /></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from '../appStore.js';
import { textColor } from '../composables/useColor';
import { getCurrentDate } from '../composables/useDate';
import useAppear from '../composables/useAppear';
import { Coin, Video } from '../assets/icons';
import Slide from '../components/Home/Slide.vue';
import i18n from '../locales';

const appStore = useAppStore();
const appear = ref(false);

onMounted(() => useAppear(appear));

const showHome = computed(() => ({
	opacity: appear.value ? '1' : '0',
}));
</script>

<style lang="scss" scoped>
.home {
	padding-bottom: 2rem;
	@media only screen and (max-width: 1450px) {
		column-gap: 1rem;
	}
	@media only screen and (max-height: 800px) {
		row-gap: 1.5vh;
	}
	@media only screen and (max-height: 810px) {
		padding: 1rem 0;
	}
	@media only screen and (max-height: 660px) {
		font-size: 1.2rem;
		row-gap: 1.5vh;
	}
	opacity: 0;
	transition: all 0.5s ease;
	position: relative;
	height: 100%;
	width: 100%;
	display: grid;
	align-items: center;
	grid-template-columns: 45% 50%;
	row-gap: 3rem;
	column-gap: 3rem;
	&__head {
		align-self: flex-end;
		& h1 {
			font-weight: 600;
			width: max-content;
		}
	}
	&__leaders {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;

		& h1 {
			font-weight: 400;
			font-size: 2rem;
		}
		&-box {
			width: 100%;
			&:not(:last-child) {
				margin-bottom: 1rem;
			}
			display: grid;
			grid-template-columns: repeat(4, 25%);
			justify-items: center;
		}
		&-title {
			color: #358184;
			font-size: 0.8rem;
			font-weight: 700;
		}
		&-detail {
			text-align: center;
			display: flex;
			align-items: center;
			color: #858597;
			gap: 0.4rem;
			font-size: 1rem;
			font-weight: 500;
		}
		& svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
	&__slider {
		grid-column: 1/-1;
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		padding-right: 7rem;
		overflow-x: auto;
		gap: 3rem;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	&__date {
		grid-row: 2 / span 1;
		color: #808080;
		margin-top: 1rem;
	}
	& button {
		@media only screen and (max-height: 830px) {
			height: 7vh;
		}
	}
}
</style>
