<template>
	<div class="courses__card">
		<img
			class="courses__card-banner"
			:src="'https://api.pharmiq.uz/files/course/' + JSON.parse(course.getinfo.courseBanner).ru"
			alt="bg"
		/>
		<h6>{{ JSON.parse(course.category.categoryName).ru }}</h6>
		<p class="courses__card-title">{{ JSON.parse(course.getinfo.courseTitleName).ru }}</p>
		<p class="courses__card-text">{{ JSON.parse(course.getinfo.courseInfo).ru }}</p>
		<CourseInfo
			:number-of-vids="course.lessons.length"
			:time="Math.round(JSON.parse(course.lessons[0].videoLength).ru / 60)"
			:font-size="1.6"
		/>
		<button style="width: 100%; padding: 1rem; font-size: 1rem" class="custom__button">
			ПРОЙТИ КУРС И ПОЛУЧИТЬ {{ course.lessons[0].quizes.prizeIQC }}
			<img v-bind:srcset="coin" alt="coin" />
		</button>
	</div>
</template>

<script setup>
import CourseInfo from '../CourseInfo.vue';
import coin from '../../assets/icons/coin-icon.svg';

const props = defineProps({
	course: Object,
});
</script>

<style lang="scss" scoped>
.courses__card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	padding: 1rem;
	border-radius: 1rem;
	background: #fff;
	box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
	gap: 1rem;
	color: var(--color-secondary-green);
	cursor: pointer;
	&-banner {
		object-fit: cover;
		width: 100%;
		height: 16.5rem;
	}
	&-title {
		color: var(--brand-solid-primary-green, #007382);

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
