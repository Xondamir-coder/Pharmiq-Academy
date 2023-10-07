<template>
	<div class="course">
		<img class="course__banner" :src="bannerUrl" alt="bg" />
		<div class="course__content">
			<h2>{{ title }}</h2>
			<p>{{ desc }}</p>
			<button>Продолжить обучение</button>
		</div>
		<div class="course__info">
			<div class="course__info--date">
				{{ startDate }} - <span v-if="endDate">{{ endDate }}</span>
				<Infinity v-else />
			</div>
			<div class="course__info--length">
				<Video />
				<span>{{ numberOfVideos }}</span>
				<p>{{ totalVideoLength }}</p>
				<div class="course__info--length__outer">
					<div class="course__info--length__inner"></div>
				</div>
			</div>
			<div class="course__info--box" v-for="(lesson, n) in course.lessons" :key="lesson.id">
				<Play />
				<p>{{ JSON.parse(lesson.lessonTitleName).ru }}</p>
				<span>Урок {{ n + 1 }}</span>
				<Coin />
				<div class="course__info--length__outer">
					<div class="course__info--length__inner"></div>
				</div>
				{{ convertToMinutes(JSON.parse(lesson.videoLength).ru) }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../appStore';
import { Video, Infinity, Play, Coin } from '../assets/icons';

const route = useRoute();
const appStore = useAppStore();
const course = ref({});

course.value = appStore.courses.find((course) => course.id == route.params.id);

const getinfo = computed(() => course.value.getinfo);
const bannerUrl = computed(
	() => `https://api.pharmiq.uz/files/course/${JSON.parse(getinfo.value.courseBanner).ru}`
);
const title = computed(() => JSON.parse(getinfo.value.courseTitleName).ru);
const desc = computed(() => JSON.parse(getinfo.value.courseInfo).ru);
const startDate = computed(() => course.value.startDate);
const endDate = computed(() => course.value.endDate);
const numberOfVideos = computed(() => `${course.value.lessons.length} видеоурока`);
const totalVideoLength = computed(() => {
	let totalVideoLength = '';
	course.value.lessons.forEach(
		(lesson) => (totalVideoLength += JSON.parse(lesson.videoLength).ru / 60)
	);
	return `${Math.round(totalVideoLength)} минут`;
});

const convertToMinutes = (seconds) => {
	var minutes = Math.floor(seconds / 60);
	var remainingSeconds = seconds % 60;

	var result =
		minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');

	return result;
};
</script>

<style lang="scss" scoped>
.course {
	padding: 1rem 0;
	padding-right: 4rem;
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-auto-rows: 1fr;
	row-gap: 1.2rem;
	height: 100vh;
	&__banner {
		grid-column: 1/-1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1.5rem;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
	}
	&__content {
		color: var(--brand-solid-primary-green, #007382);
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		& h2 {
			color: var(--brand-solid-primary-green, #007382);
			font-weight: 600;
			font-size: inherit;
		}
		& p {
			color: var(--brand-solid-secondary-green, #4db1b1);
			font-size: 1.2rem;
			font-weight: 400;
			font-size: inherit;
		}
		& button {
			border: none;
			color: #fff;
			display: flex;
			width: 24rem;
			padding: 1.2rem 1.6rem;
			justify-content: center;
			align-items: center;
			gap: 0.8rem;
			border-radius: 1rem;
			background: var(--Richard-Gradient);

			color: #fff;
			font-size: 1.2rem;
			font-weight: 600;
		}
	}
	&__info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		&--date {
			color: var(--color-secondary-green);
			font-size: 2rem;
			font-weight: 600;
			display: flex;
			align-items: center;
			gap: 0.6rem;
		}
		&--length {
			display: grid;
			grid-template-columns: repeat(2, max-content) 1fr;
			gap: 0.8rem;
			align-items: center;
			color: #61c1c0;
			& span {
				font-size: 1rem;
				font-weight: 500;
			}
			& p {
				justify-self: flex-end;
				font-weight: 700;
			}
			&__outer {
				grid-column: 1/-1;
				position: relative;
				height: 0.6rem;
				border: 1px solid #61c1c0;
				background-color: #effffe;
				border-radius: 1rem;
			}
			&__inner {
				position: absolute;
				height: 100%;
				width: 40%;
				border: 1px solid #61c1c0;
				background-color: #61c1c0;
				border-radius: 1rem;
			}
		}
	}
}
</style>
