<template>
	<section class="stats">
		<h1>Моя Статистика</h1>
		<div class="stats__container">
			<div class="stats__history">
				<h2>История кошелка</h2>
				<div class="stats__history-grid">
					<h3>Количество</h3>
					<h3>Получено / Потрачено</h3>
					<h3>Дата / Время</h3>
					<p
						:style="`color: ${stat.color}; grid-column: 1/2;`"
						v-for="(stat, index) in stats"
						:key="index"
					>
						<Coin />
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
					<div class="chart__container--1">
						<Doughnut :options="options" :data="data" />
					</div>
					<div class="chart__details">
						<p>Пройдено</p>
						<p>На изучении</p>
					</div>
				</div>

				<h2>Средняя оценка</h2>

				<div class="stats__average stats__courses--box">
					<div>
						<h1>81</h1>
						<span>/100</span>
					</div>
				</div>

				<h2>История системы</h2>

				<div class="stats__courses--system">
					<div>
						<p>В системе с</p>
						<span
							style="
								background: var(
									--richard-gradient,
									linear-gradient(136deg, #61c1c0 0%, #358184 100%)
								);
							"
							>20 .09.2022</span
						>
					</div>
					<div>
						<p>В системе</p>
						<span style="background: var(--brand-solid-secondary-blue, #4b96dc)">354 дней</span>
					</div>
					<div>
						<p>Статус</p>
						<span
							style="
								background: var(
									--richard-gradient,
									linear-gradient(136deg, #61c1c0 0%, #358184 100%)
								);
							"
							>Активный
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useAppStore } from '../appStore';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Coin } from '../assets/icons';
import stats from '../data/stats.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const appStore = useAppStore();
const ongoingCourses = appStore.ongoing.length;
const passedCourses = appStore.passed.length;
let coursesData;
if (ongoingCourses == 0 && passedCourses == 0) coursesData = [32, 32];
else coursesData = [ongoingCourses, passedCourses];
const options = {
	responsive: true,
	rotation: 80,
	plugins: {
		legend: {
			display: false,
		},
	},
};
const data = {
	labels: [`${ongoingCourses} курса`, `${passedCourses} курсов`],
	datasets: [
		{
			data: coursesData,
			backgroundColor: ['#4DB1B1', '#007382'],
			hoverOffset: 4,
		},
	],
};

setTimeout(() => {
	document.querySelector('.stats').style.transform = 'translateY(0)';
}, 100);
</script>

<style lang="scss" scoped>
.chart {
	&__details {
		margin-top: 2rem;
		display: flex;
		gap: 1rem;
		padding-bottom: 1rem;
		& p {
			width: 10rem;
			text-align: center;
			padding: 4px;
			border-radius: 4px;
			&:first-child {
				background-color: var(--color-secondary);
				background: var(--brand-solid-primary-green, #007382);
			}
			&:last-child {
				background-color: #96d2f5;
				background: var(--brand-solid-secondary-green, #4db1b1);
			}
		}
	}
	&__numbers {
		@media only screen and (max-height: 890px) {
			top: 39%;
		}
		@media only screen and (max-height: 770px) {
			top: 35%;
		}
		position: absolute;
		top: 40%;
		color: var(--brand-solid-primary-green, #007382);
		text-align: center;
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 150%; /* 2.4rem */
	}
	&__container--1 {
		@media only screen and (max-height: 890px) {
			width: 13rem;
			height: 13rem;
		}
		@media only screen and (max-height: 780px) {
			width: 13rem;
			height: 13rem;
		}
		width: 16rem;
		height: 16rem;
		display: flex;
		justify-content: center;
	}
	&__container--2 {
		@media only screen and (max-height: 890px) {
			width: 17rem;
			height: 17rem;
		}
		@media only screen and (max-height: 780px) {
			width: 13rem;
			height: 13rem;
		}
		display: flex;
		justify-content: center;
		width: 20rem;
		height: 20rem;
		margin-bottom: 1rem;
	}
}
.stats {
	height: 100vh;
	padding-top: 3rem;
	transform: translateY(-100%);
	transition: all 0.5s ease;
	&__container {
		display: flex;
		margin-top: 1.5rem;
		height: 90%;
		justify-content: space-between;
		gap: 2rem;
	}
	&__courses {
		margin-right: 3vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5rem;
		&--box {
			width: 25.2rem;
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			line-height: 150%; /* 1.8rem */
			border-radius: 10px;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			background-color: #fff;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		&--system {
			@media only screen and (max-height: 830px) {
				padding: 0.4rem;
			}
			@media only screen and (max-height: 700px) {
				padding: 0;
			}
			color: #fff;
			display: flex;
			width: 25.2rem;
			padding: 1rem;
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
			border-radius: 1rem;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			background: #fff;
			& div {
				@media only screen and (max-height: 830px) {
					padding: 0.4rem;
				}
				@media only screen and (max-height: 700px) {
					padding: 0;
				}
				display: flex;
				padding: 1rem;
				gap: 1rem;
			}
			& span {
				padding: 0.4rem 0.8rem;
				border-radius: 0.4rem;
			}
			& p {
				color: #000;
				font-size: 1.4rem;
				font-weight: 500;
				line-height: 150%; /* 2.1rem */
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
			@media only screen and (max-width: 1400px) and (max-height: 800px) {
				column-gap: 0rem;
			}
			&::-webkit-scrollbar {
				display: none;
			}
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
			& svg {
				width: 2.4rem;
				height: 2.4rem;
			}
		}
	}
	&__average {
		padding: 3.4rem 0;
		place-items: center;
		grid-template-columns: repeat(2, max-content);
		justify-content: center;

		color: var(--brand-solid-secondary-green, #4db1b1);
		text-shadow: 0px 0px 10px rgba(77, 177, 177, 0.3);
		& div {
			display: flex;
			align-items: baseline;
		}
		& h1 {
			font-weight: 700 !important;
			font-size: 6.4rem;
			line-height: 150%;
			@media only screen and (max-height: 750px) {
				line-height: 100%;
			}
		}
		& span {
			font-weight: 700 !important;
			font-size: 2rem;
		}
	}
	& h1 {
		font-weight: 500;
		width: max-content;
	}
	& h2 {
		color: #595959;
		font-size: 2rem;
		font-weight: 500;
		line-height: 150%;
	}
}
</style>
