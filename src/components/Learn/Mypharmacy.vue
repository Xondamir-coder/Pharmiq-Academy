<template>
	<div class="courses__nav">
		<button
			class="learn__button"
			v-for="btnLabel in btnLabels"
			:key="btnLabel"
			:class="[activeFilter == btnLabel ? darkActiveBtn : '', darkBtn]"
			@click="filterCourses(btnLabel)"
		>
			{{ btnLabel }}
		</button>
	</div>
	<div class="learn__container">
		<CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../../appStore';
import CourseCard from './CourseCard.vue';

const appStore = useAppStore();
const activeFilter = ref('Препараты');
const btnLabels = ref(['Препараты', 'Корпоративные']);

const filterCourses = (label) => (activeFilter.value = label);
const filteredCourses = computed(() =>
	appStore.pharmacy.filter(
		(course) => JSON.parse(course.category.categoryName).ru == activeFilter.value
	)
);
const darkBtn = computed(() => (appStore.isDark ? 'learn__button--dark' : ''));
const darkActiveBtn = computed(() =>
	appStore.isDark ? 'learn__button--dark--active' : 'learn__button--active'
);
</script>
