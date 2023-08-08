<template>
	<section class="home">
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
			<div class="home__leaders-grid">
				<p class="home__leaders-grid_title">Место</p>
				<p class="home__leaders-grid_title">Фамилия Имя</p>
				<p class="home__leaders-grid_title">Аптека</p>
				<p class="home__leaders-grid_title">Показатель обучения</p>
				<p class="home__leaders-grid_detail">1</p>
				<p class="home__leaders-grid_detail">Калинина О.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">34235 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">2</p>
				<p class="home__leaders-grid_detail">Романовский Р.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">29235 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">3</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">29035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">4</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">28035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">5</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">27035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">6</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">26035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">7</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">25035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">8</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">24035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">9</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">20035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">.................</p>
				<p class="home__leaders-grid_detail">.......................................</p>
				<p class="home__leaders-grid_detail">.......................................</p>
				<p class="home__leaders-grid_detail">.......................................</p>
				<div class="home__leaders-grid_last">
					<p>101</p>
					<p>Очкин Р.</p>
					<p>PIQ</p>
					<p style="color: #fff" class="home__leaders-grid_detail">
						2350 <img :src="coin" alt="coin" />
					</p>
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
const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.apikey}`,
};
const fetchData = async () => {
	try {
		/* Get UserName */
		const userData = await axios.get(env.userUrl, { headers });
		name.value = userData.data.user.firstName;

		/* Get Users for Leaderboard */
		const leaderboardData = await axios.get(env.leaderboardsUrl, { headers });
		users.value = leaderboardData.data;
		console.log(users.value);
	} catch (error) {
		console.error('Error:', error.message);
	}
};

onMounted(() => {
	fetchData();
	setTimeout(() => {
		document.querySelector('.home').style.opacity = '1';
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
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = months[currentDate.getMonth()];
	const year = currentDate.getFullYear();

	const formattedDate = `${day} ${month} ${year}`;
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

		&-grid {
			flex: 1;
			display: grid;
			grid-template-columns: repeat(4, 22%);
			column-gap: 2.5vh;
			row-gap: 1.5rem;
			align-items: center;
			justify-items: center;
			@media only screen and (max-width: 1450px) {
				column-gap: 2rem;
			}
			@media only screen and (max-height: 830px) {
				row-gap: 1.5vh;
			}
			@media only screen and (max-height: 530px) {
				row-gap: 0.6vh;
			}
			&_last {
				grid-column: 1/-1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0.4rem 1.4rem;
				border-radius: 0.4rem;
				background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%));
				& > * {
					color: #fff;
					font-size: 1rem;
					font-weight: 500;
				}
			}
			&_title {
				color: #358184;
				font-size: 0.8rem;
				font-weight: 700;
			}
			&_detail {
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
				height: 110%;
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
