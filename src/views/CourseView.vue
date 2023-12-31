<template>
	<div class="course">
		<img class="course__banner" :src="bannerUrl" :style="bannerAppear" alt="bg" />

		<div class="course__content">
			<h2 class="course__title" :style="[textAppear, darkmodeText]">
				{{ title }}
			</h2>
			<p class="course__text" :style="[textAppear, darkmodeText]">
				{{ desc }}
			</p>
			<RouterLink :to="lessonUrl" :style="[textAppear, darkmodeText]">
				{{ btnText }}
			</RouterLink>
		</div>

		<div class="course__info">
			<div class="course__info--date" :style="darkmodeText">
				{{ startDate }} - <span v-if="endDate">{{ endDate }}</span>
				<Infinity v-else />
			</div>

			<div class="course__info--length" :style="darkmodeText">
				<Video />
				<span>{{ numberOfVideos }}</span>
				<p>{{ totalVideoLength }}</p>
				<div class="course__info--length__outer column-span-all">
					<div
						class="course__info--length__inner"
						:style="`width: ${(100 / (totalLessons * 2)) * totalWatched}%; border: ${
							totalWatched == 0 ? '0' : '1'
						}px solid #61c1c0`"></div>
				</div>
			</div>

			<div class="course__info--box" v-for="(lesson, n) in course.lessons" :key="lesson.id">
				<RouterLink :to="`/lesson/${lesson.id}`">
					<Play class="course__info--box__play" />
				</RouterLink>

				<p :style="darkmodeText">
					{{ JSON.parse(lesson.lessonTitleName)[i18n.global.locale] }}
				</p>
				<span class="course__info--box__label"
					>{{ i18n.global.t('lesson') }} {{ n + 1 }}</span
				>
				<Coin class="course__info--box__coin" v-if="lesson.quizes.prizeIQC" />
				<div class="course__info--length__outer">
					<div
						class="course__info--length__inner"
						:style="{
							width: !lesson.lessonlog
								? '0%'
								: lesson.quizes.quizlog.length > 0
								? !lesson.quizes.quizlog[0].status
									? '50%'
									: '100%'
								: '50%',
							border: !lesson.lessonlog
								? '0px solid #61c1c0'
								: !lesson.quizes.quizlog.length > 0
								? '1px solid #61c1c0'
								: '1px solid #61c1c0',
						}"></div>
				</div>

				<span :style="darkmodeText" class="course__info--box__time">
					{{ convertToMinutes(JSON.parse(lesson.videoLength)[i18n.global.locale]) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../appStore';
import useAppear from '../composables/useAppear';
import { Video, Infinity, Play, Coin } from '../assets/icons';
import axios from 'axios';
import i18n from '../locales';

onMounted(() => {
	useAppear(show);
	fetchCourses();
});

const route = useRoute();
const appStore = useAppStore();
const course = ref({});
const show = ref(false);

const fetchCourses = async function () {
	const BASE_URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses/coursesNew?';
	const config = { headers: { Authorization: `Bearer ${appStore.token}` } };

	try {
		if (!appStore.courses) {
			const URL = `${BASE_URL}params=free`;
			const { data } = await axios.get(URL, config);
			appStore.courses = data.courses.data;
		}
		if (!appStore.pharmacy) {
			const URL = `${BASE_URL}params=special`;
			const { data } = await axios.get(URL, config);
			appStore.pharmacy = data.courses.data;
		}

		course.value = appStore.courses.find(course => course.id == route.params.id);
		if (!course.value)
			course.value = appStore.pharmacy.find(course => course.id == route.params.id);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const convertToMinutes = function (seconds) {
	let minutes = Math.floor(seconds / 60);
	let remainingSeconds = seconds % 60;

	let result =
		minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');

	return result;
};

const getinfo = computed(() => course.value.getinfo);
const bannerUrl = computed(() => {
	const getinfoValue = getinfo.value;
	if (getinfoValue) {
		return `https://api.pharmiq.uz/files/course/${
			JSON.parse(getinfoValue.courseBanner)[i18n.global.locale]
		}`;
	}
	return '';
});
const title = computed(() => {
	const getinfoValue = getinfo.value;
	if (getinfoValue) {
		return JSON.parse(getinfoValue.courseTitleName)[i18n.global.locale];
	}
	return '';
});
const desc = computed(() => {
	const getinfoValue = getinfo.value;
	if (getinfoValue) {
		return JSON.parse(getinfoValue.courseInfo)[i18n.global.locale];
	}
	return '';
});
const startDate = computed(() => course.value.startDate);
const endDate = computed(() => course.value.endDate);
const numberOfVideos = computed(() =>
	course.value.lessons ? `${course.value.lessons.length} ${i18n.global.t('video_lesson')}` : ''
);
const totalVideoLength = computed(() => {
	if (course.value.lessons) {
		let totalLength = 0;
		course.value.lessons.forEach(lesson => {
			const lessonInfo = JSON.parse(lesson.videoLength);
			if (lessonInfo && lessonInfo[i18n.global.locale]) {
				totalLength += lessonInfo[i18n.global.locale] / 60;
			}
		});
		return `${Math.round(totalLength)} ${i18n.global.t('minute')}`;
	}
	return '';
});
const btnText = computed(() =>
	course.value.lessons
		? course.value.lessons[0].lessonlog
			? i18n.global.t('continue_learning')
			: i18n.global.t('start_learning')
		: ''
);
const totalWatched = computed(() => {
	let totalWatched = 0;
	if (course.value.lessons) {
		course.value.lessons.forEach(lesson => {
			lesson.lessonlog && totalWatched++;
			lesson.quizes?.quizlog[0]?.status && totalWatched++;
			return totalWatched;
		});
		return totalWatched;
	}
	return 0;
});
const totalLessons = computed(() => (course.value.lessons ? course.value.lessons.length : 0));
const lessonUrl = computed(() => {
	if (course.value.lessons) {
		const lessonWithNoLog = course.value.lessons.find(lesson => !lesson.lessonlog);
		if (lessonWithNoLog) {
			return `/lesson/${lessonWithNoLog.id}`;
		}
		return `/lesson/${course.value.lessons[0].id}`;
	}
	return '';
});

/* Styles */
const bannerAppear = computed(() => ({
	opacity: show.value ? '1' : '0',
	transform: show.value ? 'scale(1)' : 'scale(.9)',
}));
const textAppear = computed(() => ({
	opacity: show.value ? '1' : '0',
	transform: show.value ? 'translateX(0)' : 'translateX(-15rem)',
}));
const darkmodeText = computed(() => ({
	color: appStore.isDark ? '#fff' : '',
}));
</script>

<style lang="scss" scoped>
.course {
	overflow-y: auto;
	padding: 2rem 0;
	padding-right: 4rem;
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-auto-rows: 45vh 1fr;
	row-gap: 2rem;
	column-gap: 2rem;
	height: 100vh;
	&::-webkit-scrollbar {
		display: none;
	}

	&__banner {
		transition: all 0.6s;
		grid-column: 1/-1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1.5rem;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
	}
	&__content {
		color: var(--brand-solid-primary-green, #007382);
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		& a {
			transition: opacity 0.8s 1.2s, transform 0.8s 1.2s;
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
		}
		&--box {
			width: 100%;
			display: grid;
			align-items: center;
			grid-template-columns: max-content 1fr max-content;
			column-gap: 0.8rem;
			row-gap: 0.5rem;
			& p {
				grid-column: 2 / span 1;
				color: #358184;
				font-size: 1rem;
				font-weight: 600;
				letter-spacing: 0.1rem;
			}
			&__coin {
				justify-self: center;
				grid-row: 1 / span 1;
				grid-column: 3 / span 1;
				width: 2rem;
				height: 2rem;
			}
			& a {
				align-self: flex-start;
				grid-row: 1 / span 3;
			}
			&__play {
				width: 4rem;
				height: 4rem;
			}
			&__label {
				grid-column: 2 / span 1;
				color: #858597;
				font-size: 1rem;
				font-weight: 400;
				letter-spacing: 0.1rem;
			}
			&__time {
				grid-column: 3 / span 1;
				color: var(--color-primary);
				font-size: 0.8rem;
				font-weight: 600;
				letter-spacing: 0.1rem;
			}
		}
	}
}
.column-span-all {
	grid-column: 1/-1;
}
video {
	cursor: pointer;
}
</style>
