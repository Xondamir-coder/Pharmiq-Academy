<template>
	<div class="courses__card">
		<img style="width: 100%" :src="props.img" alt="bg" />
		<h6>{{ props.category }}</h6>
		<p class="courses__card-title">{{ props.title }}</p>
		<p class="courses__card-text">{{ props.text }}</p>
		<CourseInfo :number-of-vids="1" :time="1000" :font-size="1.6" />
		<button style="width: 100%; padding: 1rem; font-size: 1rem" class="custom__button">
			ПРОЙТИ КУРС И ПОЛУЧИТЬ 20 <img v-bind:srcset="coin" alt="coin" />
		</button>
	</div>
</template>

<script setup>
const { props } = defineProps(['props']);
import coin from '../../assets/icons/coin-icon.svg';
import CourseInfo from '../CourseInfo.vue';
</script>

<style lang="scss" scoped>
.courses__card {
	display: flex;
	width: 26rem;
	padding: 1rem;
	flex-direction: column;
	justify-content: center;
	border-radius: 1rem;
	background: #fff;
	box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
	gap: 1rem;
	color: var(--color-secondary-green);
	&-title {
		font-size: 1.4rem;
		font-weight: 600;
	}
	&-text {
		font-size: 1.2rem;
		font-weight: 400;
	}
	& h6 {
		color: #61c1c0;
		font-size: 1rem;
		font-weight: 500;
		line-height: 150%; /* 1.5rem */
	}
	& button img {
		width: 2rem;
		height: 2rem;
	}
}
</style>
