<template>
	<RouterLink :to="`/course/${course.id}`" class="courses__card" :style="darkDard">
		<img class="courses__card-banner" :src="bannerUrl" alt="bg" />
		<h6>{{ categoryName }}</h6>
		<p class="courses__card-title">{{ slicedTitle }}</p>
		<p class="courses__card-text">{{ slicedDescription }}</p>
		<div class="info__box">
			<div class="info">
				<Video />
				<span>{{ numberOfVideos }}</span>
				<p>{{ totalVideoLength }}</p>
			</div>
			<div class="course__info--length__outer">
				<div
					class="course__info--length__inner"
					:style="`width: ${(100 / (totalLessons * 2)) * totalWatched}%; border: ${
						totalWatched == 0 ? '0' : '1'
					}px solid #61c1c0`"
				></div>
			</div>
		</div>
		<button class="custom__button">
			{{ prizeIqc }}
			<Coin />
		</button>
	</RouterLink>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { Coin, Video } from '../../assets/icons';
import { useAppStore } from '../../appStore';
import { useRoute } from 'vue-router';
import useAppear from '../../composables/useAppear';

const appStore = useAppStore();
const route = useRoute();
const appear = ref(false);
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
const slicedDescription = computed(() =>
	courseDescription.value.length > 50
		? `${courseDescription.value.slice(0, 50)} ...`
		: courseDescription.value
);
const slicedTitle = computed(() =>
	courseTitle.value.length > 70 ? `${courseTitle.value.slice(0, 70)} ...` : courseTitle.value
);
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
	transform: appear.value ? 'scale(1)' : 'scale(.9)',
	opacity: appear.value ? '1' : '0',
}));
const totalWatched = computed(() => {
	let totalWatched = 0;

	if (props.course.lessons) {
		props.course.lessons.forEach((lesson) => {
			/* There is no lesson log in completed thus totalWatched++ */
			if (route.name == 'completed') totalWatched++;

			/* Its for pharmacy from ongoing as there are no quizlog and lessonlog */
			if (!lesson.lessonlog && !lesson.quizes.quizlog) return;
			if (lesson.lessonlog) totalWatched++;
			if (lesson.quizes.quizlog.length > 0) {
				if (lesson.quizes.quizlog[0].status) {
					totalWatched++;
				}
			}
			return totalWatched;
		});
		return totalWatched;
	}
	return 0;
});
const totalLessons = computed(() => props.course.lessons.length);

onMounted(() => useAppear(appear));
appStore.iqc.amountOfIQC = 50;
</script>
