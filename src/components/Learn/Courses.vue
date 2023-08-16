<template>
	<div class="courses__nav">
		<button :class="{ 'active-button': activeFilter === 0 }" @click="filterCourses(0)">Все</button>
		<button :class="{ 'active-button': activeFilter === 1 }" @click="filterCourses(1)">
			Нозология
		</button>
		<button :class="{ 'active-button': activeFilter === 2 }" @click="filterCourses(2)">
			Продажи и ассортимент
		</button>
		<button :class="{ 'active-button': activeFilter === 3 }" @click="filterCourses(3)">
			Фармопека
		</button>
	</div>
	<div class="learn__container">
		<CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
	</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAppStore } from '../../appStore.js';
import CourseCard from './CourseCard.vue';

const store = useAppStore();
const activeFilter = ref(0);

const filteredCourses = computed(() => {
	if (activeFilter.value === 0) {
		return store.courses;
	}
	return store.courses.filter((course) => course.category_id === activeFilter.value);
});

const filterCourses = (id) => {
	activeFilter.value = id;
};

onMounted(() => {
	store.getCourses();
});
</script>

<style lang="scss">
.active-button {
	color: white !important;
	background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%)) !important;
	border: none !important;
}
.learn__container {
	padding: 1rem;
	display: grid;
	height: calc(100vh - 20rem);
	grid-template-columns: repeat(3, 31%);
	overflow-y: auto;
	gap: 2rem;
}
.courses__nav {
	display: flex;
	margin-left: 1rem;
	margin-bottom: 1rem;
	gap: 2rem;
	& button {
		border-radius: 1rem;
		background: white;
		padding: 1.2rem 2.4rem;
		border: 1px solid #e6e6e6;
		cursor: pointer;

		color: var(--brand-solid-secondary-green, #4db1b1);
		font-family: var(--font-base);
		font-size: 2rem;
		font-weight: 400;
	}
}
</style>
