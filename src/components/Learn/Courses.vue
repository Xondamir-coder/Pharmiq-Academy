<template>
	<div class="courses">
		<div class="courses__nav">
			<RouterLink active-class="link--active" to="">Все</RouterLink>
			<RouterLink to="">Нозология</RouterLink>
			<RouterLink to="">Название</RouterLink>
			<RouterLink to="">Название</RouterLink>
		</div>
		<div class="courses__container">
			<CourseCard v-for="course in courses" :key="course.id" :props="course" />
		</div>
	</div>
</template>

<script setup>
import courses from '../../data/course.js';
import CourseCard from './CourseCard.vue';
</script>

<style lang="scss" scoped>
.link--active {
	color: #fff !important;
	padding: 1.2rem 2.4rem !important;
	border-radius: 1rem !important;
	background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%)) !important;
}
.courses {
	&__nav {
		display: flex;
		gap: 2rem;
		margin-bottom: 1rem;
		& a {
			color: var(--brand-solid-secondary-green, #4db1b1);
			padding: 1.2rem 2.4rem;
			border-radius: 1rem;
			border: 1px solid #e6e6e6;
			background: #fff;
			font-size: 2rem;
		}
	}
	&__container {
		@media screen and (max-height: 700px) {
			height: 70vh;
		}
		display: grid;
		height: 75vh;
		grid-template-columns: repeat(3, max-content);
		overflow-y: auto;
		gap: 2rem;
	}
}
</style>
