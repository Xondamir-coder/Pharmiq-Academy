<template>
	<div class="learn__container" :style="{ height: height }">
		<CourseCard v-for="course in courses" :key="course.id" :props="course" />
	</div>
</template>

<script setup>
import CourseCard from './CourseCard.vue';
import courses from '../../data/course.js';
const { height } = defineProps(['height']);
</script>

<style lang="scss" scoped>
.learn__container {
	padding: 1rem;
	display: grid;
	height: calc(100vh - 25rem);
	grid-template-columns: repeat(3, 31%);
	overflow-y: auto;
	gap: 2rem;
}
</style>
