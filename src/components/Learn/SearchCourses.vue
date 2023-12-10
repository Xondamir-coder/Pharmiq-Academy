<template>
	<div class="learn__container">
		<CourseCard v-for="course in appStore.searchedCourses" :key="course.id" :course="course" />
	</div>
</template>

<script setup>
import { useAppStore } from '../../appStore';
import CourseCard from './CourseCard.vue';

const appStore = useAppStore();
</script>
