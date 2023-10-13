<template>
	<div class="quiz">
		<div class="quiz__head">
			<div class="quiz__head--left">
				<h1>Тестирование</h1>
				<p>{{ title }}</p>
				<div class="quiz__head--quantity">
					<h2>ВОПРОС {{ currentQuestion + 1 }} из {{ maxNumOfQuestions }}</h2>
					<div class="quiz__bar--outer">
						<div class="quiz__bar--inner" :style="barStyle"></div>
					</div>
				</div>
			</div>
			<div class="quiz__timer" :style="timerStyle">
				<Timer :fill="timerColor" />
				{{ time }}
			</div>
		</div>

		<div class="quiz__card">
			<h3>{{ question }}</h3>
			<div class="quiz__card--options">
				<div
					class="quiz__card--option"
					v-for="option in quiz.variants"
					ref="options"
					:style="{
						color: showAnswer
							? option.rightAnswer || selectedAnswer == JSON.parse(option.variantText).ru
								? '#fff'
								: ''
							: '',
						background: showAnswer
							? option.rightAnswer
								? 'linear-gradient(102deg, #5EBC67 -0.69%, #3E9147 100%)'
								: selectedAnswer == JSON.parse(option.variantText).ru
								? 'linear-gradient(102deg, #E75F5F -0.69%, #B43939 100%)'
								: ''
							: '',
						border: showAnswer
							? option.rightAnswer
								? '#5EBC67 '
								: selectedAnswer == JSON.parse(option.variantText).ru
								? '#E75F5F '
								: ''
							: '',
					}"
				>
					<label :for="option.id" @click="preventClick"
						>{{ JSON.parse(option.variantText).ru }}
					</label>
					<RadioChosen
						:type="
							showAnswer
								? option.rightAnswer
									? 'correct'
									: selectedAnswer == JSON.parse(option.variantText).ru
									? 'wrong'
									: 'chosen'
								: 'chosen'
						"
					>
						<input
							type="radio"
							name="answer"
							:value="JSON.parse(option.variantText).ru"
							v-model="selectedAnswer"
							:id="option.id"
							@change="selectOption"
						/>
					</RadioChosen>
				</div>
			</div>
		</div>

		<button class="quiz__button" @click="checkAnswer" :disabled="!selectedAnswer" :style="btnStyle">
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
			<button :style="popupBtnStyle" @click="closePopup(true)" class="popup__button" v-if="fail">
				ПРОЙТИ ЗАНОВО
			</button>
			<button class="popup__button" :style="popupBtnStyle" @click="closePopup(false)">OK</button>
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

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

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
const showPopup = ref(false);
const popupTitle = ref('');
const success = ref();

const config = { headers: { Authorization: `Bearer ${appStore.token}` } };
const activeClass = 'quiz__card--option__checked';

const findLesson = async () => {
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
		const foundCourseInCourses = appStore.courses.find((course) =>
			course.lessons.find((lesson) => lesson.id == route.params.id)
		);
		// Find the lesson in pharmacy if not found in courses
		const foundCourseInPharmacy = !foundCourseInCourses
			? appStore.pharmacy.find((course) =>
					course.lessons.find((lesson) => lesson.id == route.params.id)
			  )
			: null;

		// Set the lesson ref based on the found course
		const lesson =
			foundCourseInCourses?.lessons.find((lesson) => lesson.id == route.params.id) ||
			foundCourseInPharmacy?.lessons.find((lesson) => lesson.id == route.params.id);
		fetchLesson(lesson.course_id);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const fetchLesson = async (course_id) => {
	const URL = `https://api.pharmiq.uz/api/v1-1/spa-courses/getLessons?course_id=${course_id}`;
	try {
		const { data } = await axios.get(URL, config);
		const foundLesson = data.lessons.find((lesson) => lesson.id == route.params.id);
		lesson.value = foundLesson;
		quizes.value = foundLesson.quizes;
		countdown(quizes.value.timeLimits);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const checkAnswer = () => {
	showAnswer.value ? (checked.value = true) : null;

	showAnswer.value = true;

	/* If answer is true increment numOfCorrectAnswers */
	selectedAnswer.value == correctAnswer.value && checked.value
		? increment(numOfCorrectAnswers)
		: null;

	/* If user selected next then increment currentQuestion */
	btnText.value == 'Дальше' && checked.value ? increment(currentQuestion) : null;
	checked.value ? clearState() : null;

	btnText.value == 'Завершить' ? displayPopup() : null;
	btnText.value == 'Завершить' && !fail.value ? postQuiz() : null;
};
const countdown = (minutes) => {
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
		seconds--;
	}, 1000); // Update every 1 second
};
const selectOption = () => {
	const target = event.target.closest('.quiz__card--option');
	removeActiveClass();
	target.classList.add(activeClass);
};
const displayPopup = () => (showPopup.value = true);
const closePopup = (again) => {
	clearState();
	showPopup.value = false;
	if (!again) {
		router.push('/');
		return;
	}
	currentQuestion.value = 0;
	numOfCorrectAnswers.value = 0;
	stateOfTime.value = 'full';
	countdown(quizes.value.timeLimits);
};
const postQuiz = async () => {
	const URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses/lessonQuizPost';

	try {
		const { data } = await axios.post(URL, formData, config);
		success.value = data;
	} catch (error) {
		console.log('Error:', error);
	}
};
const removeActiveClass = () =>
	options.value.forEach((option) =>
		option.classList.contains(activeClass) ? option.classList.remove(activeClass) : null
	);
const preventClick = () => (showAnswer.value ? event.preventDefault() : null);
const clearState = () => {
	selectedAnswer.value = '';
	showAnswer.value = false;
	checked.value = false;
	removeActiveClass();
};
const increment = (el) => el.value++;

const title = computed(() => (lesson.value ? JSON.parse(lesson.value.lessonTitleName).ru : ''));
const maxNumOfQuestions = computed(() => (quizes.value ? quizes.value.questions.length : ''));
const quiz = computed(() => (quizes.value ? quizes.value.questions[currentQuestion.value] : {}));
const question = computed(() => {
	if (lesson.value && quizes.value && quiz.value) return JSON.parse(quiz.value.question).ru;
	return '';
});
const correctAnswer = computed(() => {
	if (quiz.value)
		return JSON.parse(quiz.value.variants.find((variant) => variant.rightAnswer).variantText).ru;
	return '';
});
const btnText = computed(() =>
	selectedAnswer.value && !showAnswer.value
		? 'Ответить'
		: showAnswer.value
		? isLastQuestion.value == maxNumOfQuestions.value
			? 'Завершить'
			: 'Дальше'
		: 'Ответить'
);
const isLastQuestion = computed(() =>
	currentQuestion.value == maxNumOfQuestions.value - 1
		? maxNumOfQuestions.value
		: currentQuestion.value
);
const resultMessage = computed(() =>
	numOfCorrectAnswers.value >= quizes.value?.numberRightAnswersToPass
		? 'Вы прошли тестирование'
		: 'Вы не прошли тестирование'
);
const countMessage = computed(
	() => `Правильные ответы: ${numOfCorrectAnswers.value} из ${maxNumOfQuestions.value}`
);
const fail = computed(() => (resultMessage.value == 'Вы не прошли тестирование' ? true : false));

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
}));
const popupStyle = computed(() => ({
	width: 'auto',
	height: 'auto',
	padding: '2rem',
	background: fail.value ? 'linear-gradient(102deg, #FF736E -0.69%, #FF4D46 100%)' : '',
}));

onMounted(() => {
	findLesson();
});
</script>

<style lang="scss" scoped>
.quiz {
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
		align-items: center;

		display: inline-flex;
		padding: 0.2rem 2.6rem;
		align-items: center;
		gap: 1rem;
		border-radius: 1.5rem;
		background: #fff;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25) inset;
	}
	&__bar {
		&--outer {
			position: relative;
			width: 14.3rem;
			height: 0.5rem;
			border-radius: 1rem;
			background-color: #effffe;
			border: 1px solid #61c1c0;
		}
		&--inner {
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
		background: #fff;
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

		border-radius: 1.6rem;
		background: #fff;
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
		& h3 {
			color: var(--Text-Primary, #131313);
			font-size: 1.6rem;
			font-weight: 400;
			line-height: 150%;
		}
		& label {
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
				background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
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
