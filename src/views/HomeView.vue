<template>
	<section class="home" :style="showHome">
		<div class="home__head">
			<h1 :style="textColor" class="home__username">
				С возращением, {{ appStore.user.firstName }}!
			</h1>
			<p class="home__date" :style="textColor">{{ getFormattedDate }}</p>
		</div>

		<div class="home__slider">
			<Slide v-for="news in appStore.news" :key="news.id" :news="news" />
		</div>

		<div class="home__course">
			<div class="home__course-bg">
				<img src="../assets/books.webp" alt="Books" />
				<p>Базовый курс по PharmIQ</p>
			</div>
			<p class="home__course-category">Категория</p>
			<h2>КУРС: НАЗВАНИЕ КУРСА</h2>
			<div class="info__box">
				<div class="info">
					<Video />
					<span>1 видеоурок</span>
					<p>15 минут</p>
				</div>
				<div class="info__bar"></div>
			</div>

			<button class="custom__button">
				ПРОЙТИ КУРС И ПОЛУЧИТЬ 200
				<Coin />
			</button>
		</div>

		<div class="home__leaders">
			<h1 :style="textColor">Таблица лидеров</h1>
			<div>
				<div class="home__leaders-box">
					<p class="home__leaders-title">Место</p>
					<p class="home__leaders-title">Фамилия Имя</p>
					<p class="home__leaders-title">Аптека</p>
					<p class="home__leaders-title">Показатель обучения</p>
				</div>

				<div v-for="(user, id) in appStore.leaders" :key="id" class="home__leaders-box">
					<p class="home__leaders-detail">{{ id + 1 }}</p>
					<p class="home__leaders-detail">{{ user.user }}</p>
					<p class="home__leaders-detail">{{ user.company }}</p>
					<p class="home__leaders-detail">{{ user.iqc }} <Coin /></p>
				</div>

				<div class="home__leaders-box">
					<p class="home__leaders-detail">............</p>
					<p class="home__leaders-detail">..........................</p>
					<p class="home__leaders-detail">..........................</p>
					<p class="home__leaders-detail">..........................</p>
				</div>

				<div class="home__leaders-box home__leaders-box_last">
					<p class="home__leaders-detail">101</p>
					<p class="home__leaders-detail">Очкин Р.</p>
					<p class="home__leaders-detail">PIQ</p>
					<p class="home__leaders-detail">2350 <Coin /></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from '../appStore.js';
import { textColor } from '../composables/useColor';
import useAppear from '../composables/useAppear';
import { Coin, Video } from '../assets/icons';
import Slide from '../components/Home/Slide.vue';

const appStore = useAppStore();
const appear = ref(false);

onMounted(() => useAppear(appear));

const getFormattedDate = computed(() => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const currentDate = new Date();
	const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')} ${
		months[currentDate.getMonth()]
	} ${currentDate.getFullYear()}`;
	return formattedDate;
});
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
		grid-column: 2 / span 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;

		& h1 {
			font-weight: 400;
		}
		&-box {
			width: 100%;
			&:not(:last-child) {
				margin-bottom: 1rem;
			}
			display: grid;
			grid-template-columns: repeat(4, 25%);
			justify-items: center;
			&_last {
				background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%));
				padding: 0.4rem 0rem;
				border-radius: 0.4rem;
				& p {
					color: white;
				}
			}
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
	&__course {
		height: 100%;
		grid-column: 1 / span 1;
		width: 100%;
		max-width: 520px;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		gap: 1rem;
		@media only screen and (max-height: 830px) {
			gap: 1vh;
		}

		&-bg {
			border-radius: 3rem;
			background: linear-gradient(136deg, #61c1c0 0%, #358184 100%);
			width: 100%;
			max-width: 520px;
			height: 50%;
			display: flex;
			align-items: center;
			@media only screen and (max-height: 830px) {
				margin-bottom: 0;
			}
			& img {
				transform: translateY(3%);
				width: 50%;
				height: 120%;
			}
			& p {
				width: 10.6rem;
				color: #fff;
				font-weight: 700;
			}
		}
		& h2 {
			color: #358184;
			font-size: 1.5rem;
			font-weight: 600;
		}
		&-category {
			color: #61c1c0;
			font-size: 1rem;
			font-weight: 500;
			line-height: 150%;
		}
		& button {
			width: 100%;
		}
	}
	& button {
		@media only screen and (max-height: 830px) {
			height: 7vh;
		}
	}
}
</style>
