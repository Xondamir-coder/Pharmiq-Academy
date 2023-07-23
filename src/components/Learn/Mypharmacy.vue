<template>
	<div class="mypharmacy">
		<div class="mypharmacy__nav">
			<RouterLink active-class="link--active" to="">Препараты</RouterLink>
			<RouterLink to="">Корпортивные</RouterLink>
		</div>
		<div class="mypharmacy__container">
			<CourseCard v-for="course in courses" :key="course.id" :props="course" />
		</div>
	</div>
</template>

<script setup>
import CourseCard from '../Learn/CourseCard.vue';
import courses from '../../data/course.js';
</script>

<style lang="scss" scoped>
.link--active {
	color: #fff !important;
	padding: 1.2rem 2.4rem !important;
	border-radius: 1rem !important;
	background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%)) !important;
}
.mypharmacy {
	overflow-y: auto;
	&__container {
		height: 100vh;
		padding-left: 3rem;
		padding-bottom: 3rem;
		padding-top: 2rem;
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(3, max-content);
		column-gap: 2rem;
		row-gap: 3rem;
	}
	&__nav {
		display: flex;
		padding-left: 3rem;
		margin-bottom: 1rem;
		gap: 2rem;
		& a {
			color: var(--brand-solid-secondary-green, #4db1b1);
			padding: 1.2rem 2.4rem;
			border-radius: 1rem;
			border: 1px solid #e6e6e6;
			background: #fff;
			font-size: 2rem;
		}
	}
}
</style>
