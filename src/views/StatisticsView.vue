<template>
	<section class="stats">
		<h1 style="font-weight: 500; width: max-content">Моя Статистика</h1>
		<div class="stats__container">
			<div class="stats__history">
				<h2>История кошелка</h2>
				<div class="stats__history-grid">
					<h3>Количество</h3>
					<h3>Получено / Потрачено</h3>
					<h3>Дата / Время</h3>
					<p
						:style="`color: ${stat.color}; grid-column: 1/2; justify-self: right;`"
						v-for="(stat, index) in stats"
						:key="index"
					>
						{{ stat.number }} <img :src="coin" alt="coin" />
					</p>
					<p
						:style="`color: ${stat.color}; grid-column: 2/3; grid-row: ${stat.id}/span 1; justify-self: left`"
						v-for="stat in stats"
						:key="stat.id"
					>
						{{ stat.text }}
					</p>
					<p
						:style="`color: ${stat.color}; grid-column: 3/4; grid-row: ${stat.id}/span 1`"
						v-for="stat in stats"
						:key="stat.id"
					>
						16.03.23 / 16:52
					</p>
				</div>
			</div>
			<div class="stats__courses">
				<h2>Курсы</h2>
				<div class="stats__courses--box">
					<Doughnut :options="options" :data="data" />
					<div
						style="
							display: flex;
							justify-content: center;
							gap: 1rem;
							margin-top: 1rem;
							padding: 1rem;
						"
					>
						<p style="background-color: var(--color-secondary)">Пройдено</p>
						<p style="background-color: #96d2f5">На изучении</p>
					</div>
				</div>
				<h2>Средняя оценка</h2>
				<div class="stats__courses--box">
					<Doughnut :options="options" :data="data2" />
					<div
						style="
							display: flex;
							justify-content: center;
							gap: 1rem;
							margin-top: 1rem;
							padding: 1rem;
						"
					>
						<p style="background-color: var(--color-secondary)">Пройдено</p>
						<p style="background-color: #96d2f5">На изучении</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import coin from '../assets/icons/coin-icon.svg';
import stats from '../data/stats.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
ChartJS.register(ArcElement, Tooltip, Legend);
setTimeout(() => {
	document.querySelector('.stats').style.transform = 'translateY(0)';
}, 100);
const data = {
	labels: ['Dark Blue', 'Light Blue'],
	datasets: [
		{
			label: 'My First Dataset',
			data: [32, 32],
			backgroundColor: ['#4B96DC', '#96D2F5'],
			hoverOffset: 4,
		},
	],
};
const options = {
	responsive: true,
};
const data2 = {
	labels: ['Dark Green', 'Light Green'],
	datasets: [
		{
			label: 'Second Doughnut',
			data: [71, 100],
			backgroundColor: ['#4B96DC', '#96D2F5'],
			hoverOffset: 4,
		},
	],
};
</script>

<style lang="scss" scoped>
.stats {
	height: 100%;
	padding-top: 3rem;
	transform: translateY(-100%);
	transition: all 0.5s ease;
	&__container {
		display: flex;
		gap: 3rem;
		margin-top: 1.5rem;
		height: 90%;
	}
	&__courses {
		&--box {
			width: 252px;
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			line-height: 150%; /* 1.8rem */
			border-radius: 10px;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			background-color: #fff;
			& p {
				width: 10rem;
				text-align: center;
				padding: 4px;
				border-radius: 4px;
			}
		}
	}
	&__history {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		&-grid {
			height: 100%;
			overflow-y: auto;
			width: max-content;
			padding: 2rem;
			border-radius: 1rem;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			background-color: #fff;
			display: grid;
			grid-template-columns: 12rem 20rem 12rem;
			column-gap: 3rem;
			row-gap: 0.88rem;
			align-items: center;
			justify-items: center;
			& h3 {
				color: #595959;
				font-size: 1.6rem;
				font-weight: 600;
				line-height: 150%; /* 2.4rem */
			}
			& p {
				font-size: 1.6rem;
				font-weight: 500;
				line-height: 150%; /* 2.4rem */
				display: flex;
				gap: 0.4rem;
				align-items: center;
				justify-content: right;
				text-align: center;
			}
			& img {
				width: 2.4rem;
				height: 2.4rem;
			}
		}
	}
	& h2 {
		color: #595959;
		font-size: 2rem;
		font-weight: 500;
		line-height: 150%;
	}
}
</style>
