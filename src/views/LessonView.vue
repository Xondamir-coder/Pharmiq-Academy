<template>
	<div class="lesson">
		<video controls @timeupdate="trackVideo">
			<source :src="videoUrl" type="video/mp4" />
			{{ i18n.global.t('not_support') }}
		</video>

		<div class="lesson__buttons">
			<div class="lesson__buttons--active" :style="btnStyle"></div>
			<button
				@click="toggleBtn(btn)"
				:style="{ color: showMaterials == i ? '#fff' : '#858597' }"
				class="lesson__button"
				v-for="(btn, i) in [
					i18n.global.t('lesson_text'),
					i18n.global.t('lesson_materials'),
				]"
				:key="btn">
				{{ btn }}
			</button>
		</div>

		<h2 class="course__title" :style="[textAppear, darkmodeText]">{{ title }}</h2>

		<div ref="transcript" class="lesson__transcript" v-if="!showMaterials">
			<div class="lesson__text" v-html="text" :style="[textAppear, darkmodeText]"></div>
		</div>

		<div class="lesson__materials" v-else>
			<div v-if="lesson.materials.length > 0">
				{{ lesson.materials }}
			</div>
			<p v-else :style="textColor">{{ i18n.global.t('no_materials') }}</p>
		</div>
		<RouterLink v-if="watchedVideo" :style="textAppear" class="lesson__test" :to="quizUrl">
			{{ btnText }}
		</RouterLink>

		<button
			v-else
			:style="textAppear"
			@click="togglePopup(true)"
			class="lesson__test lesson__test--locked">
			<Locked />
			{{ i18n.global.t('start_quiz') }}
			<Locked />
		</button>

		<Teleport to="body">
			<div class="overlay" v-if="showPopup" @click="togglePopup(false)"></div>
			<Transition name="fade">
				<div class="popup" v-if="showPopup">
					<p>{{ i18n.global.t('warning_pass') }}</p>
					<button @click="togglePopup(false)" class="popup__button">OK</button>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup>
import axios from 'axios';
import { Locked } from '../assets/icons';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../appStore';
import useAppear from '../composables/useAppear';
import { textColor } from '../composables/useColor';
import { getFormData } from '../composables/useFormData';
import i18n from '../locales';

const appStore = useAppStore();
const route = useRoute();
const lesson = ref();
const transcript = ref(null);
const showMaterials = ref(false);
const appear = ref(false);
const watchedVideo = ref(false);
const isWatching = ref(false);
const showPopup = ref(false);
const config = { headers: { Authorization: `Bearer ${appStore.token}` } };

const togglePopup = val => (showPopup.value = val);
const toggleBtn = function (label) {
	showMaterials.value = label == i18n.global.t('lesson_materials');
	countdown(1, 120000);
};
const findLesson = async function () {
	const BASE_URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses/coursesNew?';
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

		// Find the lesson in courses
		const foundCourseInCourses = appStore.courses.find(course =>
			course.lessons.find(lesson => lesson.id == route.params.id)
		);

		// Find the lesson in pharmacy if not found in courses
		const foundCourseInPharmacy = !foundCourseInCourses
			? appStore.pharmacy.find(course =>
					course.lessons.find(lesson => lesson.id == route.params.id)
			  )
			: null;

		// Set the lesson ref based on the found course
		lesson.value =
			foundCourseInCourses?.lessons.find(lesson => lesson.id == route.params.id) ||
			foundCourseInPharmacy?.lessons.find(lesson => lesson.id == route.params.id);

		fetchLesson(lesson.value.course_id);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const fetchLesson = async function (course_id) {
	const URL = `https://api.pharmiq.uz/api/v1-1/spa-courses/getLessons?course_id=${course_id}`;
	try {
		const { data } = await axios.get(URL, config);
		lesson.value = data.lessons.find(lesson => lesson.id == route.params.id);
		watchedVideo.value = lesson.value.lessonlog;
	} catch (error) {
		console.log('Error: ', error);
	}
};
const trackVideo = function () {
	const videoLength = parseInt(JSON.parse(lesson.value.videoLength)[i18n.global.locale]) * 1000;
	countdown(0, videoLength);
};
const lessonWatched = async function (typeContent) {
	const URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses/saveLessonLog';
	const formData = getFormData();
	formData.append('lesson_id', lesson.value.id);
	formData.append('typeContent', typeContent);
	try {
		const { data } = await axios.post(URL, formData, config);
		console.log('Lesson learned', data);
		watchedVideo.value = true;
	} catch (error) {
		console.log('Error: ', error);
	}
};
const countdown = function (type, time) {
	if (isWatching.value || watchedVideo.value) return;
	isWatching.value = true;
	setTimeout(() => {
		lessonWatched(type);
	}, time);
};
const videoUrl = computed(() =>
	lesson.value ? JSON.parse(lesson.value.videoLocId)[i18n.global.locale] : ''
);
const title = computed(() =>
	lesson.value ? JSON.parse(lesson.value.lessonTitleName)[i18n.global.locale] : ''
);
const text = computed(() =>
	lesson.value && lesson?.value?.contents
		? JSON.parse(lesson.value.contents[0].body)[i18n.global.locale]
		: ''
);
const btnText = computed(() =>
	lesson.value.quizes.quizlog == 0 ? i18n.global.t('start_quiz') : i18n.global.t('restart_quiz')
);
const quizUrl = computed(() => `/quiz/${lesson.value.id}`);

const textAppear = computed(() => ({
	opacity: appear.value ? '1' : '0',
	transform: appear.value ? 'translateY(0)' : 'translateY(3rem)',
}));
const btnStyle = computed(() => ({
	transform: showMaterials.value ? 'translateX(100%)' : 'translateX(0)',
}));
const darkmodeText = computed(() => ({
	color: appStore.isDark ? '#fff' : '',
}));

onMounted(() => {
	findLesson();
	useAppear(appear);
});
</script>

<style lang="scss" scoped>
.lesson {
	overflow-y: auto;
	padding: 2rem 0;
	padding-right: 4rem;
	display: grid;
	justify-items: flex-start;
	grid-template-columns: 1fr;
	grid-auto-rows: 45vh max-content max-content max-content max-content;
	row-gap: 2rem;
	column-gap: 2rem;
	height: 100vh;
	&::-webkit-scrollbar {
		display: none;
	}
	& video {
		cursor: pointer;
		transition: all 0.6s;
		grid-column: 1/-1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1.5rem;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
	}
	&__text {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		transition: all 0.8s 0.6s;
		color: var(--brand-solid-secondary-green, #4db1b1);
		font-weight: 400;
		font-size: 1.6rem;
		& a {
			color: var(--color-primary-pink);
		}
	}
	&__buttons {
		position: relative;
		display: inline-flex;
		padding-right: 0px;
		align-items: center;
		gap: 1rem;

		border-radius: 3rem;
		border: 1px solid #b8b8d2;

		&--active {
			transition: transform 0.5s;
			z-index: -2;
			width: 50%;
			height: 5.2rem;
			top: 0;
			position: absolute;
			border-radius: 3rem;
			background: linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%);
			box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
		}
	}
	&__button {
		text-transform: uppercase;
		transition: color 0.3s 0.2s;
		height: 5.2rem;
		padding: 0.8rem 4rem;
		border: none;
		color: #858597;
		font-size: 1.2rem;
		font-weight: 600;
		border-radius: 3rem;
		background-color: transparent;
	}
	&__test {
		transition: all 0.4s 1s;
		border: none;
		display: flex;
		width: 25.8rem;
		height: 4.8rem;
		padding: 1.2rem 1.6rem;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;

		border-radius: 1rem;
		background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));

		color: #fff;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		&--locked {
			display: flex;
			padding: 1.2rem 1.6rem;
			justify-content: center;
			align-items: center;
			gap: 0.8rem;

			border: none;
			border-radius: 1rem;
			background: var(--brand-solid-primary-white, #e6f0f0);
			color: #b3b3b3;
		}
	}
	&__popup {
		display: flex;
		width: 32rem;
		height: 18rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.6rem;

		border-radius: 1.6rem;
		background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
	}
}
.fade-leave-active,
.fade-enter-active {
	transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
	transform: translate(-50%, -50%) scale(0.5);
	opacity: 0;
}
</style>
