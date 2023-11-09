<template>
	<section class="stats" :style="sectionStyle">
		<h1 class="stats__heading" :style="textColor">{{ i18n.global.t('stats_title') }}</h1>
		<div class="stats__container">
			<div class="stats__history">
				<h2 :style="darkText">
					{{ i18n.global.t('stats_wallet') }}
				</h2>
				<div class="stats__history-grid">
					<div class="stats__history--box">
						<h3 :style="darkText">{{ i18n.global.t('stats_amount') }}</h3>
						<h3 :style="darkText">{{ i18n.global.t('stats_gain') }}</h3>
						<h3 :style="darkText">{{ i18n.global.t('stats_date') }}</h3>
					</div>
					<div
						v-for="transaction in appStore.transactions.iqcTransactions"
						:key="transaction.id"
						:style="{
							color: transaction.valueType ? '#61c1c0' : 'var(--color-primary-pink)',
						}"
						class="stats__history--box">
						<p>
							<span v-if="transaction.valueType">+</span>
							<span v-else>-</span>
							{{ transaction.value }}
							<Coin />
						</p>
						<p>
							{{ transaction.serviceName }}
						</p>
						<p>
							{{ formatDate(transaction.updated_at) }}
						</p>
					</div>
				</div>
			</div>

			<div class="stats__courses">
				<h2 :style="darkText">
					{{ i18n.global.t('learn_courses') }}
				</h2>

				<div class="stats__courses--box">
					<div class="chart__container--1">
						<Doughnut :options="options" :data="data" />
					</div>
					<div class="chart__details">
						<p>{{ i18n.global.t('stats_passed') }}</p>
						<p>{{ i18n.global.t('stats_ongoing') }}</p>
					</div>
				</div>

				<h2 :style="darkText">
					{{ i18n.global.t('stats_average') }}
				</h2>

				<div class="stats__average stats__courses--box">
					<div :style="scoreStyle">
						<h1>{{ userAverageScore }}</h1>
						<span>/100</span>
					</div>
				</div>

				<h2 :style="darkText">
					{{ i18n.global.t('stats_history') }}
				</h2>

				<div class="stats__courses--system">
					<div>
						<p :style="textColor">{{ i18n.global.t('stats_from') }}</p>
						<span class="bg-dark-blue">{{ userCreatedDate }}</span>
					</div>
					<div>
						<p :style="textColor">{{ i18n.global.t('stats_system') }}</p>
						<span class="bg-blue">{{ userActiveDays }}</span>
					</div>
					<div>
						<p :style="textColor">{{ i18n.global.t('stats_status') }}</p>
						<span class="bg-green">{{ i18n.global.t('stats_active') }}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppStore } from '../appStore';
import { textColor } from '../composables/useColor';
import useAppear from '../composables/useAppear';
import { Coin } from '../assets/icons';
import i18n from '../locales';

ChartJS.register(ArcElement, Tooltip, Legend);

const ongoingLength = computed(() => appStore.stats && appStore.stats.ongoing);
const passedLength = computed(() => appStore.stats && appStore.stats.passed);
const userCreatedDate = computed(() => new Date(appStore.user.created_at).toLocaleDateString());
const userActiveDays = computed(() => {
	const currentDate = new Date();
	const userLoggedInDate = new Date(appStore.user.created_at);
	const timeDifference = currentDate - userLoggedInDate;
	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	return `${days} ${i18n.global.t('stats_days')}`;
});
const userAverageScore = computed(() => appStore.stats && appStore.stats.rate);

const appStore = useAppStore();
const appear = ref(false);
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
	labels: [`${ongoingLength.value} курса`, `${passedLength.value} курсов`],
	datasets: [
		{
			data: [ongoingLength.value, passedLength.value],
			backgroundColor: ['#4DB1B1', '#007382'],
			hoverOffset: 4,
		},
	],
};

const formatDate = originalDate => {
	const date = new Date(originalDate);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');

	return `${day}.${month}.${year} / ${hours}:${minutes}`;
};

const sectionStyle = computed(() => ({
	transform: appear.value ? 'translateY(0)' : 'translateY(-100%)',
}));
const scoreStyle = computed(() => ({
	color:
		userAverageScore.value >= 81
			? 'var(--color-secondary-green)'
			: userAverageScore.value > 55
			? 'var(--Not-yet)'
			: 'var(--color-primary-pink)',
	textShadow:
		userAverageScore.value >= 81
			? '0px 0px 10px rgba(77, 177, 177, 0.3)'
			: userAverageScore.value > 55
			? '0px 0px 10px #f2c94c30'
			: '0px 0px 10px #ff736e75 ',
}));
const darkText = computed(() => ({ color: appStore.isDark ? '#fff' : '' }));

onMounted(() => useAppear(appear));
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
	padding: 1rem 0;
	transition: all 0.5s ease;
	display: grid;
	grid-auto-rows: max-content 1fr;
	&__container {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}
	&__courses {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		@media only screen and (min-height: 700px) and (max-width: 1400px) {
			margin-right: 5rem;
		}
		&--box {
			width: 25.2rem;
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			line-height: 150%; /* 1.8rem */
			border-radius: 10px;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: auto;
		}
		&--system {
			@media only screen and (max-height: 830px) {
				padding: 0.4rem;
			}
			@media only screen and (max-height: 700px) {
				padding: 0;
			}
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			color: #fff;
			width: 25.2rem;
			padding: 1rem;
			gap: 1rem;
			border-radius: 1rem;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			& div {
				@media only screen and (max-height: 830px) {
					padding: 0.4rem;
				}
				@media only screen and (max-height: 700px) {
					padding: 0;
				}
				width: 100%;
				display: grid;
				align-items: center;
				grid-template-columns: repeat(2, 1fr);
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
		&--box {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			justify-items: center;
		}
		&-grid {
			height: 100%;
			width: 100%;
			overflow-y: auto;
			padding: 2rem;
			border-radius: 1rem;
			border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
			display: flex;
			flex-direction: column;
			gap: 1rem;
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
	&__heading {
		margin-bottom: 1rem;
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
.bg-green {
	background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
}
.bg-dark-blue {
	background: var(--brand-solid-secondary-blue, #4b96dc);
}
.bg-blue {
	background: var(--brand-solid-secondary-light-blue, #96d2f5);
}
</style>
