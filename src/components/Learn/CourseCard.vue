<template>
	<div class="courses__card">
		<img
			class="courses__card-banner"
			:src="`https://api.pharmiq.uz/files/course/${bannerUrl}`"
			alt="bg"
		/>
		<h6>{{ categoryName }}</h6>
		<p class="courses__card-title">{{ courseTitle }}</p>
		<p class="courses__card-text">{{ courseDescription }}</p>
		<div class="info__box">
			<div class="info">
				<Video />
				<span>{{ numberOfVideos }} видеоурок</span>
				<p>{{ videoLength }} минут</p>
			</div>
			<div class="info__bar"></div>
		</div>
		<button class="custom__button">
			ПРОЙТИ КУРС И ПОЛУЧИТЬ {{ prizeIqc }}
			<Coin />
		</button>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { Coin, Video } from '../../assets/icons';

const props = defineProps({
	course: Object,
});

const getInfo = computed(() => props.course.getinfo);
const bannerUrl = computed(() => JSON.parse(getInfo.value.courseBanner).ru);
const categoryName = computed(() => JSON.parse(props.course.category.categoryName).ru);
const courseTitle = computed(() => JSON.parse(getInfo.value.courseTitleName).ru);
const courseDescription = computed(() => JSON.parse(getInfo.value.courseInfo).ru);
const numberOfVideos = computed(() => props.course.lessons.length);
const videoLength = computed(() => {
	let videoLength = '';
	props.course.lessons.forEach((lesson) => (videoLength += JSON.parse(lesson.videoLength).ru / 60));
	return Math.round(videoLength);
});
const prizeIqc = computed(() => {
	let prizeIqc = '';
	props.course.lessons.forEach((lesson) => (prizeIqc += lesson.quizes.prizeIQC));
	return prizeIqc;
});
</script>
