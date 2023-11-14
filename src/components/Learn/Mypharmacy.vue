<template>
	<div class="courses__nav">
		<button
			class="learn__button"
			v-for="btnLabel in btnLabels"
			:key="btnLabel"
			:class="[activeFilter == btnLabel ? darkActiveBtn : '', darkBtn]"
			@click="filterCourses(btnLabel)">
			{{ btnLabel }}
		</button>
	</div>
	<div class="learn__container">
		<CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
	</div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useAppStore } from '../../appStore';
import CourseCard from './CourseCard.vue';
import i18n from '../../locales';

const appStore = useAppStore();
const activeFilter = ref(i18n.global.t('learn_drugs'));
const btnLabels = computed(() => [i18n.global.t('learn_drugs'), i18n.global.t('learn_corporate')]);

const filterCourses = label => (activeFilter.value = label);
const filteredCourses = computed(() =>
	appStore.pharmacy
		.filter(
			course =>
				JSON.parse(course.category.categoryName)[i18n.global.locale] == activeFilter.value
		)
		.filter(
			course =>
				JSON.parse(course.getinfo.courseInfo)
					[i18n.global.locale].toLowerCase()
					.includes(appStore.query.toLowerCase()) ||
				JSON.parse(course.getinfo.courseTitleName)
					[i18n.global.locale].toLowerCase()
					.includes(appStore.query.toLowerCase())
		)
);
const darkBtn = computed(() => (appStore.isDark ? 'learn__button--dark' : ''));
const darkActiveBtn = computed(() =>
	appStore.isDark ? 'learn__button--dark--active' : 'learn__button--active'
);
watchEffect(() => (activeFilter.value = i18n.global.t('learn_drugs')));
</script>
