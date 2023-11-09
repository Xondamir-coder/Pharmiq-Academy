<template>
	<div class="courses__nav">
		<button
			class="learn__button"
			v-for="(btnLabel, id) in btnLabels"
			:key="id"
			:class="[activeFilter == id ? darkActiveBtn : '', darkBtn]"
			@click="filterCourses(id)">
			{{ btnLabel }}
		</button>
	</div>
	<div class="learn__container">
		<CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../../appStore.js';
import CourseCard from './CourseCard.vue';
import i18n from '../../locales';

const store = useAppStore();
const activeFilter = ref(0);
const btnLabels = computed(() => [
	i18n.global.t('learn_all'),
	i18n.global.t('learn_nosology'),
	i18n.global.t('learn_sell'),
	i18n.global.t('learn_farmopeka'),
]);

const filteredCourses = computed(() => {
	if (activeFilter.value === 0) return store.courses;
	return store.courses.filter(course => course.category_id === activeFilter.value);
});
const darkBtn = computed(() => (store.isDark ? 'learn__button--dark' : 'learn__button'));
const darkActiveBtn = computed(() =>
	store.isDark ? 'learn__button--dark--active' : 'learn__button--active'
);
const filterCourses = id => (activeFilter.value = id);
</script>
