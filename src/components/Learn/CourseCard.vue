<template>
	<RouterLink :to="`/course/${course.id}`" class="courses__card" :style="darkDard">
		<img class="courses__card-banner" :src="bannerUrl" alt="bg" />
		<h6 :style="darkmodeText">{{ categoryName }}</h6>
		<p :style="darkmodeText" class="courses__card-title">{{ slicedTitle }}</p>
		<p :style="darkmodeText" class="courses__card-text">{{ slicedDescription }}</p>
		<div class="info__box">
			<div class="info" :style="darkmodeText">
				<Video />
				<span>{{ numberOfVideos }}</span>
				<p>{{ totalVideoLength }}</p>
			</div>
			<div class="course__info--length__outer">
				<div
					class="course__info--length__inner"
					:style="`width: ${(100 / (totalLessons * 2)) * totalWatched}%; border: ${
						totalWatched == 0 ? '0' : '1'
					}px solid #61c1c0`"></div>
			</div>
		</div>
		<button class="custom__button">
			{{ btnText }}
			<Coin v-if="!isQuizPassed && prizeIqc > 0" />
		</button>
	</RouterLink>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { Coin, Video } from '../../assets/icons';
import { useAppStore } from '../../appStore';
import { useRoute } from 'vue-router';
import useAppear from '../../composables/useAppear';
import i18n from '../../locales';

const appStore = useAppStore();
const route = useRoute();
const appear = ref(false);
const props = defineProps({
	course: Object,
});

const getInfo = computed(() => props.course.getinfo);
const bannerUrl = computed(
	() =>
		`https://api.pharmiq.uz/files/course/${
			JSON.parse(getInfo.value.courseBanner)[i18n.global.locale]
		}`
);
const categoryName = computed(
	() => JSON.parse(props.course.category.categoryName)[i18n.global.locale]
);
const courseTitle = computed(() => JSON.parse(getInfo.value.courseTitleName)[i18n.global.locale]);
const courseDescription = computed(() => JSON.parse(getInfo.value.courseInfo)[i18n.global.locale]);
const slicedDescription = computed(() =>
	courseDescription.value.length > 50
		? `${courseDescription.value.slice(0, 50)} ...`
		: courseDescription.value
);
const slicedTitle = computed(() =>
	courseTitle.value.length > 70 ? `${courseTitle.value.slice(0, 70)} ...` : courseTitle.value
);
const numberOfVideos = computed(
	() => `${props.course.lessons.length} ${i18n.global.t('video_lesson')}`
);
const totalVideoLength = computed(() => {
	let totalVideoLength = '';
	props.course.lessons.forEach(
		lesson => (totalVideoLength += JSON.parse(lesson.videoLength)[i18n.global.locale] / 60)
	);
	return `${Math.round(totalVideoLength)} ${i18n.global.t('minute')}`;
});
const isQuizPassed = computed(() => props.course.lessons[0].quizes.quizlog.length);
const prizeIqc = computed(() => {
	let prizeIqc = '';
	props.course.lessons.forEach(lesson => (prizeIqc += lesson.quizes.prizeIQC));
	return prizeIqc;
});
const btnText = computed(() => {
	if (!isQuizPassed.value && prizeIqc.value > 0)
		return i18n.global.locale == 'ru'
			? `ПРОЙТИ КУРС И ПОЛУЧИТЬ ${prizeIqc.value}`
			: `Kursni boshlab ${prizeIqc.value} yutib olish`;
	else if (isQuizPassed.value)
		return i18n.global.locale == 'ru' ? `ПОВТОРИТЬ КУРС` : 'Kursni takrorlash';
	else return i18n.global.locale == 'ru' ? 'Пройти курс' : 'Kursni boshlash';
});

const darkDard = computed(() => ({
	boxShadow: appStore.isDark ? '0px 0px 8px 0px rgba(0, 0, 0, 0.10)' : '',
	background: appStore.isDark ? '#1A1A1A' : '',
	transform: appear.value ? 'scale(1)' : 'scale(.9)',
	opacity: appear.value ? '1' : '0',
}));
const darkmodeText = computed(() => ({
	color: appStore.isDark ? '#fff' : '',
}));

const totalWatched = computed(() => {
	let totalWatched = 0;

	if (props.course.lessons) {
		props.course.lessons.forEach(lesson => {
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
</script>

<style scoped lang="scss">
button svg {
	width: 3.6rem;
	height: 3.6rem;
}
button {
	text-transform: uppercase;
}
</style>
