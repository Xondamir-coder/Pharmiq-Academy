<template>
	<section class="home" :style="[showHome, textColor]">
		<div class="home__head">
			<h1 class="home__username">
				{{ i18n.global.t('home_title') }}, {{ appStore.user.firstName }}!
			</h1>
			<p class="home__date">{{ getCurrentDate() }}</p>
		</div>

		<div class="home__slider">
			<Slide v-for="news in appStore.news" :key="news.id" :news="news" />
		</div>

		<div class="home__leaders">
			<h1 class="home__title">{{ i18n.global.t('board_title') }}</h1>
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

		<div class="home__survey">
			<h1 class="home__title">{{ i18n.global.t('home_survey') }}</h1>
			<div class="home__survey--card">
				<h2 class="home__survey--title">{{ i18n.global.t('question') }}:</h2>
				<p class="home__survey--text">
					1. К Вам зашел клиент и попросил лекарство от боли в горле что Вы ему
					предложите?
				</p>
				<div class="home__survey--select">
					<select>
						<option :value="i18n.global.t('home_choose_variant')" selected disabled>
							{{ i18n.global.t('home_choose_variant') }}
						</option>
					</select>
					<ArrowDown color="#358184" />
				</div>
				<button class="home__survey--button">
					{{ i18n.global.t('answer') }}
				</button>
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
import { ArrowDown, Coin } from '../assets/icons';
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
	&__title {
		font-weight: 400;
		font-size: 2rem;
	}
	& button {
		@media only screen and (max-height: 830px) {
			height: 7vh;
		}
	}
	&__survey {
		align-self: flex-start;
		margin-right: 4rem;
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
		&--card {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 1.2rem;
			box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25) inset;
			padding: 2rem;
			border-radius: 1rem;
			filter: blur(2px);
			pointer-events: none;
		}
		&--title {
			color: #358184;
			font-size: 1.5rem;
			font-weight: 700;
			text-transform: uppercase;
		}
		&--text {
			color: #858597;
			font-size: 1.4rem;
			font-weight: 400;
		}
		&--select {
			cursor: pointer;
			position: relative;
			display: inline-block;
			display: flex;
			width: 100%;
			height: 4.8rem;
			justify-content: space-between;
			align-items: center;
			border-radius: 1rem;
			border: 1px solid #61c1c0;
			background: #effffe;
			box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);

			& select {
				padding: 0 2rem;
				cursor: pointer;
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
				width: 100%;
				height: 4.8rem;
				border: none;
				background: transparent;
				border-radius: 1rem;

				color: #858597;
				font-family: var(--font-base);
				font-size: 1.2rem;
				font-weight: 400;
				&:focus + svg {
					transform: rotate(180deg);
				}
			}
			& svg {
				position: absolute;
				right: 2rem;
				transition: transform 0.5s;
			}
		}
		&--button {
			width: 100%;
			display: flex;
			height: 4.8rem;
			padding: 1.2rem 1.6rem;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			border-radius: 10px;
			border: none;
			color: #fff;
			background: var(
				--Richard-Gradient,
				linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%)
			);
		}
	}
}
</style>
