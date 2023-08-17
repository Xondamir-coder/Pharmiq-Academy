<template>
	<section class="home" :style="{ opacity: showHome ? '1' : '0' }">
		<div style="align-self: flex-end">
			<h1 style="font-weight: 600; width: max-content" class="home__username">
				С возращением, {{ name }}!
			</h1>
			<p class="home__date">{{ getFormattedDate() }}</p>
		</div>

		<div class="home__slider">
			<Slide v-for="slide in slides" :key="slide.id" :props="slide" />
		</div>

		<div class="home__course">
			<div class="home__course-bg">
				<img :src="books" alt="Books" />
				<p>Базовый курс по PharmIQ</p>
			</div>
			<p class="home__course-category">Категория</p>
			<h2>КУРС: НАЗВАНИЕ КУРСА</h2>
			<CourseInfo :number-of-vids="1" :time="15" :font-size="1.6" />
			<button style="width: 100%" class="custom__button">
				ПРОЙТИ КУРС И ПОЛУЧИТЬ 200
				<img style="width: 3.6rem; height: 3.6rem" :src="coin" alt="Money" />
			</button>
		</div>

		<div class="home__leaders">
			<h1>Таблица лидеров</h1>
			<div>
				<div class="home__leaders-box">
					<p class="home__leaders-title">Место</p>
					<p class="home__leaders-title">Фамилия Имя</p>
					<p class="home__leaders-title">Аптека</p>
					<p class="home__leaders-title">Показатель обучения</p>
				</div>

				<div v-for="(user, id) in users" :key="id" class="home__leaders-box">
					<p class="home__leaders-detail">{{ id + 1 }}</p>
					<p class="home__leaders-detail">{{ user.user }}</p>
					<p class="home__leaders-detail">{{ user.company }}</p>
					<p class="home__leaders-detail">{{ user.iqc }} <img :src="coin" alt="coin" /></p>
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
					<p class="home__leaders-detail">2350 <img :src="coin" alt="coin" /></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import axios from 'axios';
import env from '../env.js';
import { onMounted, ref } from 'vue';
import books from '../assets/books.webp';
import coin from '../assets/icons/coin-icon.svg';
import Slide from '../components/Home/Slide.vue';
import slides from '../data/slide.js';
import CourseInfo from '../components/CourseInfo.vue';

const name = ref('');
const users = ref([]);
const showHome = ref(false);

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.apikey}`,
};

const fetchData = async () => {
	try {
		const [userData, leaderboardData, coursesData] = await Promise.all([
			axios.get(env.url.users, { headers }),
			axios.get(env.url.leaderboard, { headers }),
		]);

		name.value = userData.data.user.firstName;
		users.value = leaderboardData.data;
	} catch (error) {
		console.error('Error:', error.message);
	}
};

onMounted(() => {
	fetchData();
	setTimeout(() => {
		showHome.value = true;
	}, 200);
});

const getFormattedDate = () => {
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
};
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
	&__leaders {
		grid-column: 2 / span 1;
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
		& img {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
	& h1 {
		font-weight: 400;
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
		overflow: hidden;
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
	}
	& button {
		@media only screen and (max-height: 830px) {
			height: 7vh;
		}
	}
}
</style>
