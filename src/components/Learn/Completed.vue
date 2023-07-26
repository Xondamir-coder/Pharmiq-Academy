<template>
	<div class="current__nav">
		<RouterLink active-class="link--active" class="learn--link" to="">Курсы</RouterLink>
		<RouterLink class="learn--link" to="">Моя Аптека</RouterLink>
	</div>
	<div class="current__nav">
		<RouterLink active-class="link--active" class="learn--link" to="">Все</RouterLink>
		<RouterLink class="learn--link" to="">Нозология</RouterLink>
		<RouterLink class="learn--link" to="">Курсы</RouterLink>
		<RouterLink class="learn--link" to="">Нейм</RouterLink>
		<RouterLink class="learn--link" to="">Нейм</RouterLink>
	</div>
	<div class="current__container">
		<CourseCard v-for="course in courses" :key="course.id" :props="course" />
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

a {
	color: var(--color-secondary-green);
}
.current {
	&__nav {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
	}
	&__container {
		@media screen and (max-height: 700px) {
			height: 70vh;
		}
		display: grid;
		height: 60vh;
		grid-template-columns: repeat(3, max-content);
		overflow-y: auto;
		gap: 2rem;
	}
}
</style>
