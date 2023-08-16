<template>
	<div class="courses__nav">
		<button :class="{ 'active-button': activeFilter === 0 }" @click="filterCourses(0)">
			Курсы
		</button>
		<button :class="{ 'active-button': activeFilter === 1 }" @click="filterCourses(1)">
			Моя Аптека
		</button>
	</div>
	<div class="courses__nav" style="margin-top: 2rem">
		<button :class="{ 'active-button': activeFilter_2 === 0 }" @click="filterCourses_2(0)">
			Все
		</button>
		<button :class="{ 'active-button': activeFilter_2 === 1 }" @click="filterCourses_2(1)">
			Нозология
		</button>
		<button :class="{ 'active-button': activeFilter_2 === 2 }" @click="filterCourses_2(2)">
			Нейм
		</button>
		<button :class="{ 'active-button': activeFilter_2 === 3 }" @click="filterCourses_2(3)">
			Нейм
		</button>
	</div>
	<div class="learn__container" style="height: calc(100vh - 25rem)">
		<div class="courses__card" v-for="course in courses" :key="course.id">
			<img style="height: 13.5rem" class="courses__card-banner" :src="course.img" alt="bg" />
			<h6>{{ course.category }}</h6>
			<p class="courses__card-title">{{ course.title }}</p>
			<p class="courses__card-text">{{ course.text }}</p>
			<CourseInfo :number-of-vids="1" :time="1000" :font-size="1.6" />
			<button style="width: 100%; padding: 1rem; font-size: 1rem" class="custom__button">
				ПРОЙТИ КУРС И ПОЛУЧИТЬ 20
				<img v-bind:srcset="coin" alt="coin" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import courses from '../../data/course.js';
import coin from '../../assets/icons/coin-icon.svg';
import CourseInfo from '../CourseInfo.vue';

const activeFilter = ref(0);
const activeFilter_2 = ref(0);

const filterCourses = (id) => {
	activeFilter.value = id;
};
const filterCourses_2 = (id) => {
	activeFilter_2.value = id;
};
</script>

<style lang="scss" scoped>
h1 {
	margin-left: 1rem;
	color: #545454;
	font-family: Montserrat;
	font-size: 2.4rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
}
</style>
