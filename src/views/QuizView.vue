<template>
	<div class="quiz" :style="quizStyle">
		<div class="quiz__head">
			<div class="quiz__head--left" :style="textColor">
				<h1>{{ i18n.global.t('test') }}</h1>
				<p>{{ title }}</p>
				<div class="quiz__head--quantity">
					<h2 :style="darkHeadingStyle">{{ questionsLeft }}</h2>
					<div class="quiz__bar--outer">
						<div class="quiz__bar--inner" :style="barStyle"></div>
					</div>
				</div>
			</div>
			<div class="quiz__timer" :style="timerStyle">
				<Timer :fill="timerColor" />
				<span>{{ time }}</span>
			</div>
		</div>

		<div class="quiz__card" :style="[darkmodeText, cardStyle]">
			<h3 :style="darkHeadingStyle">{{ question }}</h3>
			<div class="quiz__card--options">
				<div
					class="quiz__card--option"
					v-for="option in quizQuestions"
					ref="options"
					:style="{
						color: showAnswer
							? option.rightAnswer ||
							  selectedAnswer == JSON.parse(option.variantText)[i18n.global.locale]
								? '#fff'
								: ''
							: '',
						background: showAnswer
							? option.rightAnswer
								? 'linear-gradient(102deg, #5EBC67 -0.69%, #3E9147 100%)'
								: selectedAnswer ==
								  JSON.parse(option.variantText)[i18n.global.locale]
								? 'linear-gradient(102deg, #E75F5F -0.69%, #B43939 100%)'
								: ''
							: '',
						border: showAnswer
							? option.rightAnswer
								? '#5EBC67 '
								: selectedAnswer ==
								  JSON.parse(option.variantText)[i18n.global.locale]
								? '#E75F5F '
								: ''
							: '',
					}">
					<label :for="option.id" @click="preventClick"
						>{{ JSON.parse(option.variantText)[i18n.global.locale] }}
					</label>
					<RadioChosen
						:type="
							showAnswer
								? option.rightAnswer
									? 'correct'
									: selectedAnswer ==
									  JSON.parse(option.variantText)[i18n.global.locale]
									? 'wrong'
									: 'chosen'
								: 'chosen'
						">
						<input
							type="radio"
							name="answer"
							:value="JSON.parse(option.variantText)[i18n.global.locale]"
							v-model="selectedAnswer"
							:id="option.id"
							@change="selectOption" />
					</RadioChosen>
				</div>
			</div>
		</div>

		<button
			class="quiz__button"
			@click="checkAnswer"
			:disabled="!selectedAnswer"
			:style="btnStyle">
			{{ btnText }}
		</button>
	</div>
	<Popup class="quiz__popup" :style="popupStyle" :success="showPopup">
		<template #content>
			<h2 v-if="popupTitle">{{ popupTitle }}</h2>
			<p v-if="popupTitle">{{ resultMessage }}</p>
			<h2 v-else>{{ resultMessage }}</h2>
			<p>{{ countMessage }}</p>
			<h1 v-if="!fail">{{ success }} <Coin /></h1>
		</template>
		<template #btn>
			<button
				:style="popupBtnStyle"
				@click="closePopup(true)"
				class="popup__button"
				v-if="fail">
				{{ i18n.global.t('restart') }}
			</button>
			<button class="popup__button" :style="popupBtnStyle" @click="closePopup(false)">
				OK
			</button>
		</template>
	</Popup>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '../appStore';
import { Timer, RadioChosen, Coin } from '../assets/icons';
import Popup from '../components/Popup.vue';
import { getFormData } from '../composables/useFormData';
import useAppear from '../composables/useAppear';
import { textColor } from '../composables/useColor';
import i18n from '../locales';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const reqAnswers = [];
const lesson = ref(false);
const quizes = ref(false);
const time = ref();
const stateOfTime = ref('full');
const currentQuestion = ref(0);
const numOfCorrectAnswers = ref(0);
const selectedAnswer = ref('');
const showAnswer = ref(false);
const options = ref(null);
const checked = ref(false);
const isReset = ref(false);
const showPopup = ref(false);
const appear = ref(false);
const popupTitle = ref('');
const success = ref();

const config = { headers: { Authorization: `Bearer ${appStore.token}` } };
const activeClass = 'quiz__card--option__checked';

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
		const lesson =
			foundCourseInCourses?.lessons.find(lesson => lesson.id == route.params.id) ||
			foundCourseInPharmacy?.lessons.find(lesson => lesson.id == route.params.id);
		fetchLesson(lesson.course_id);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const fetchLesson = async function (course_id) {
	const URL = `https://api.pharmiq.uz/api/v1-1/spa-courses/getLessons?course_id=${course_id}`;
	try {
		const { data } = await axios.get(URL, config);
		const foundLesson = data.lessons.find(lesson => lesson.id == route.params.id);
		lesson.value = foundLesson;
		quizes.value = foundLesson.quizes;
		quizes.value.questions = shuffleArray(quizes.value.questions);
		countdown(quizes.value.timeLimits);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const checkAnswer = function () {
	showAnswer.value && (checked.value = true);
	showAnswer.value = true;

	/* If answer is true increment numOfCorrectAnswers */
	selectedAnswer.value == correctAnswer.value && checked.value && increment(numOfCorrectAnswers);

	btnText.value == i18n.global.t('complete') && checked.value && displayPopup();
	btnText.value == i18n.global.t('complete') && !fail.value && postQuiz();
	/* If user selected next then increment currentQuestion */

	btnText.value == i18n.global.t('next') &&
		checked.value &&
		(addToReqAnswers() || increment(currentQuestion));
	checked.value && clearState();
};
const countdown = function (minutes) {
	let seconds = minutes * 60;

	const countdownInterval = setInterval(() => {
		const minutesDisplay = Math.floor(seconds / 60);
		const secondsDisplay = seconds % 60;

		const formattedMinutes = minutesDisplay.toString().padStart(2, '0');
		const formattedSeconds = secondsDisplay.toString().padStart(2, '0');

		time.value = `${formattedMinutes}:${formattedSeconds}`;

		if (seconds <= (minutes / 2) * 60) stateOfTime.value = 'half';
		if (seconds < 60) stateOfTime.value = 'last';
		if (seconds <= 0) {
			clearInterval(countdownInterval);
			showPopup.value = true;
			popupTitle.value = 'Время вышло';
		}
		if (isReset.value) {
			clearInterval(countdownInterval);
			isReset.value = false;
		}
		seconds--;
	}, 1000); // Update every 1 second
};
const selectOption = function () {
	const target = event.target.closest('.quiz__card--option');
	removeActiveClass();
	target.classList.add(activeClass);
};
const closePopup = function (again) {
	clearState();
	showPopup.value = false;
	if (!again) {
		router.push('/learn');
		return;
	}
	currentQuestion.value = 0;
	numOfCorrectAnswers.value = 0;
	stateOfTime.value = 'full';
	isReset.value = true;
	countdown(quizes.value.timeLimits);
};
const postQuiz = async function () {
	stringifyVariants();
	const URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses/lessonQuizPost';
	const formData = getFormData();
	formData.append('quiz_id', quizes.value.id);
	formData.append('lesson_id', lesson.value.id);
	formData.append('question', JSON.stringify(reqAnswers));
	formData.append('timeLeft', time.value);

	try {
		const { data } = await axios.post(URL, formData, config);
		success.value = data.iqc;
		appStore.getUser();
	} catch (error) {
		console.log('Error:', error);
	}
};
const clearState = function () {
	selectedAnswer.value = '';
	showAnswer.value = false;
	checked.value = false;
	removeActiveClass();
};
const shuffleArray = function (array) {
	const shuffled = [...array]; // Create a copy of the original array
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled; // Return the shuffled array
};
const addToReqAnswers = function () {
	reqAnswers.push({
		question_ru: question.value,
		variants: [
			{
				id: quiz.value.variants[0].id,
				choose:
					JSON.parse(quiz.value.variants[0].variantText)[i18n.global.locale] ==
					selectedAnswer.value,
				rightAnswer: quiz.value.variants[0].rightAnswer,
			},
			{
				id: quiz.value.variants[1].id,
				choose:
					JSON.parse(quiz.value.variants[1].variantText)[i18n.global.locale] ==
					selectedAnswer.value,
				rightAnswer: quiz.value.variants[1].rightAnswer,
			},
			{
				id: quiz.value.variants[2].id,
				choose:
					JSON.parse(quiz.value.variants[2].variantText)[i18n.global.locale] ==
					selectedAnswer.value,
				rightAnswer: quiz.value.variants[2].rightAnswer,
			},
		],
	});
};
const stringifyVariants = function () {
	for (const [i, { variants }] of reqAnswers.entries()) {
		reqAnswers[i].variants = JSON.stringify(variants);
	}
};
const removeActiveClass = () =>
	options.value.forEach(option =>
		option.classList.contains(activeClass) ? option.classList.remove(activeClass) : null
	);
const preventClick = () => showAnswer.value && event.preventDefault();
const increment = el => el.value++;
const displayPopup = () => (showPopup.value = true);

const title = computed(
	() => lesson.value && JSON.parse(lesson.value.lessonTitleName)[i18n.global.locale]
);
const questionsLeft = computed(() =>
	i18n.global.locale == 'ru'
		? `ВОПРОС ${currentQuestion.value + 1} из ${maxNumOfQuestions.value}`
		: `${currentQuestion.value + 1}-SAVOL ${maxNumOfQuestions.value} DAN`
);
const maxNumOfQuestions = computed(() => quizes.value && quizes.value.questions.length);
const quiz = computed(() => quizes.value && quizes.value.questions[currentQuestion.value]);
const quizQuestions = computed(() => quiz.value && shuffleArray(quiz.value.variants));
const question = computed(() => {
	if (lesson.value && quizes.value && quiz.value)
		return JSON.parse(quiz.value.question)[i18n.global.locale];
	return '';
});
const correctAnswer = computed(() => {
	if (quiz.value)
		return JSON.parse(quiz.value.variants.find(variant => variant.rightAnswer).variantText)[
			i18n.global.locale
		];
	return '';
});
const btnText = computed(() =>
	selectedAnswer.value && !showAnswer.value
		? i18n.global.t('answer')
		: showAnswer.value
		? isLastQuestion.value == maxNumOfQuestions.value
			? i18n.global.t('complete')
			: i18n.global.t('next')
		: i18n.global.t('answer')
);
const isLastQuestion = computed(() =>
	currentQuestion.value == maxNumOfQuestions.value - 1
		? maxNumOfQuestions.value
		: currentQuestion.value
);
const resultMessage = computed(() =>
	numOfCorrectAnswers.value >= quizes.value?.numberRightAnswersToPass
		? i18n.global.t('quiz_success')
		: i18n.global.t('quiz_fail')
);
const countMessage = computed(() =>
	i18n.global.locale == 'ru'
		? `Правильные ответы: ${numOfCorrectAnswers.value} из ${maxNumOfQuestions.value}`
		: `To'gri javoblar: ${numOfCorrectAnswers.value} dan ${maxNumOfQuestions.value}`
);
const fail = computed(() => resultMessage.value == i18n.global.t('quiz_fail'));

const quizStyle = computed(() => ({
	opacity: appear.value ? '1' : '0',
	transform: appear.value ? 'translateY(0)' : 'translateY(10%)',
}));
const timerStyle = computed(() => ({
	color: timerColor.value,
	border: `1px solid ${timerColor.value}`,
}));
const timerColor = computed(() =>
	stateOfTime.value == 'full' ? '#61C1C0' : stateOfTime.value == 'half' ? '#F2C94C' : '#FF736E'
);
const barStyle = computed(
	() => `width: ${isLastQuestion.value * (100 / maxNumOfQuestions.value)}%`
);
const btnStyle = computed(() => ({
	background: !selectedAnswer.value ? 'var(--brand-solid-primary-white, #E6F0F0)' : '',
	color: !selectedAnswer.value ? '#B3B3B3' : '',
}));
const popupBtnStyle = computed(() => ({
	color: fail.value ? '#FF736E' : '#4DB1B1',
	textTransform: 'uppercase',
}));
const popupStyle = computed(() => ({
	width: 'auto',
	height: 'auto',
	padding: '2rem',
	background: fail.value ? 'linear-gradient(102deg, #FF736E -0.69%, #FF4D46 100%)' : '',
}));
const darkHeadingStyle = computed(() => ({
	color: appStore.isDark ? '#fff' : '',
}));
const cardStyle = computed(() => ({
	boxShadow: appStore.isDark ? '0px 0px 8px 0px rgba(0, 0, 0, 0.10)' : '',
	background: appStore.isDark ? '#121212' : '',
}));
const darkmodeText = computed(() => ({
	color: appStore.isDark ? '#8B8B8B' : '',
}));

onMounted(() => {
	findLesson();
	useAppear(appear);
});
</script>

<style lang="scss" scoped>
.quiz {
	transition: all 1s 1s;
	padding: 2rem 0;
	padding-right: 3rem;
	display: grid;
	gap: 3.5rem;
	&__head {
		color: var(--Text-Primary, #131313);
		display: flex;
		align-items: center;
		justify-content: space-between;
		&--left {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		&--quantity {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		& h1 {
			font-size: 2.2rem;
			font-weight: 600;
			letter-spacing: 0.072rem;
		}
		& h2 {
			color: #358184;
			font-size: 1.6rem;
			font-weight: 700;
		}
		& p {
			font-size: 1.8rem;
			font-weight: 600;
		}
	}
	&__timer {
		font-feature-settings: 'clig' off, 'liga' off;
		font-size: 3rem;
		font-weight: 600;
		line-height: 130%;

		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0.2rem 2.6rem;
		gap: 1rem;
		border-radius: 1.5rem;
		background: transparent;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25) inset;
		& span {
			width: 10rem;
		}
		& svg {
			width: 6.2rem;
			height: 6.2rem;
		}
	}
	&__bar {
		&--outer {
			transition: all 0.5s;
			position: relative;
			width: 14.3rem;
			height: 0.5rem;
			border-radius: 1rem;
			background-color: #effffe;
			border: 1px solid #61c1c0;
		}
		&--inner {
			transition: all 0.5s;
			position: absolute;
			top: 0;
			left: 0;
			width: 40%;
			height: 100%;
			background-color: #61c1c0;
		}
	}
	&__card {
		display: flex;
		padding: 2.5rem 2rem;
		flex-direction: column;
		gap: 1.6rem;

		border-radius: 1.6rem;
		background: transparent;
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
		& h3 {
			color: var(--Text-Primary, #131313);
			font-size: 1.6rem;
			font-weight: 400;
			line-height: 150%;
		}
		& label {
			transition: all 0.5s;
			cursor: pointer;
			height: 100%;
			font-size: 1.2rem;
			font-weight: 600;
			text-transform: uppercase;

			display: flex;
			align-items: center;
		}
		&--options {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
		&--option {
			display: grid;
			grid-template-columns: 1fr max-content;
			padding: 0 1.6rem;
			height: 4.8rem;
			align-items: center;
			gap: 0.8rem;
			border-radius: 3rem;
			border: 1px solid #8b8b8b;
			&__checked {
				background: var(
					--Richard-Gradient,
					linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%)
				);
				color: #fff;
				border: none;
			}
			& input {
				display: none;
			}
		}
	}
	&__button {
		border: none;
		display: flex;
		width: 25.8rem;
		height: 4.8rem;
		padding: 1.2rem 1.6rem;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;
		border-radius: 3rem;
		background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
		color: #fff;
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	&__popup {
		& div {
			width: 10rem;
		}
		& h2 {
			color: #fff;
			font-size: 2.4rem;
			font-weight: 600;
		}
		& p {
			color: #fff;
			font-size: 1.6rem;
			font-weight: 600;
		}
	}
}
</style>
