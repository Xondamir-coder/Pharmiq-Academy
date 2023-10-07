<template>
	<RouterLink :to="`/course/${course.id}`" class="courses__card" :style="darkDard">
		<img class="courses__card-banner" :src="bannerUrl" alt="bg" />
		<h6>{{ categoryName }}</h6>
		<p class="courses__card-title">{{ courseTitle }}</p>
		<p class="courses__card-text">{{ courseDescription }}</p>
		<div class="info__box">
			<div class="info">
				<Video />
				<span>{{ numberOfVideos }}</span>
				<p>{{ totalVideoLength }}</p>
			</div>
			<div class="info__bar"></div>
		</div>
		<button class="custom__button">
			{{ prizeIqc }}
			<Coin />
		</button>
	</RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import { Coin, Video } from '../../assets/icons';
import { useAppStore } from '../../appStore';

const appStore = useAppStore();
const props = defineProps({
	course: Object,
});

const getInfo = computed(() => props.course.getinfo);
const bannerUrl = computed(
	() => `https://api.pharmiq.uz/files/course/${JSON.parse(getInfo.value.courseBanner).ru}`
);
const categoryName = computed(() => JSON.parse(props.course.category.categoryName).ru);
const courseTitle = computed(() => JSON.parse(getInfo.value.courseTitleName).ru);
const courseDescription = computed(() => JSON.parse(getInfo.value.courseInfo).ru);
const numberOfVideos = computed(() => `${props.course.lessons.length} видеоурок`);
const totalVideoLength = computed(() => {
	let totalVideoLength = '';
	props.course.lessons.forEach(
		(lesson) => (totalVideoLength += JSON.parse(lesson.videoLength).ru / 60)
	);
	return `${Math.round(totalVideoLength)} минут`;
});
const prizeIqc = computed(() => {
	let prizeIqc = '';
	props.course.lessons.forEach((lesson) => (prizeIqc += lesson.quizes.prizeIQC));
	return `ПРОЙТИ КУРС И ПОЛУЧИТЬ ${prizeIqc}`;
});
const darkDard = computed(() => ({
	boxShadow: appStore.isDark ? '0px 0px 8px 0px rgba(255, 255, 255, 0.3)' : '',
}));
</script>
