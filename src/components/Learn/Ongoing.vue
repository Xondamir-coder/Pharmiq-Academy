<template>
	<div class="courses__nav">
		<div>
			<button
				class="learn__button"
				v-for="mainLabel in mainLabels"
				:key="mainLabel"
				:class="[selectedMainLabel === mainLabel ? darkActiveBtn : '', darkBtn]"
				@click="selectMainLabel(mainLabel)"
			>
				{{ mainLabel }}
			</button>
		</div>
		<div>
			<button
				class="learn__button"
				v-for="secondaryLabel in secondaryLabels"
				:key="secondaryLabel"
				:class="[selectedSecondaryLabel === secondaryLabel ? darkActiveBtn : '', darkBtn]"
				@click="selectSecondaryLabel(secondaryLabel)"
			>
				{{ secondaryLabel }}
			</button>
		</div>
	</div>
	<div class="learn__container" v-if="!isEmpty">
		<CourseCard v-for="item in filteredCourses" :key="item.course.id" :course="item.course" />
	</div>
	<h1 class="courses__empty" :style="textColor" v-else>У вас нет курсов на изучении</h1>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAppStore } from '../../appStore';
import CourseCard from './CourseCard.vue';
import { textColor } from '../../composables/useColor';

const appStore = useAppStore();
const mainLabels = ref(['Курсы', 'Моя Аптека']);
const selectedMainLabel = ref('Курсы');
const selectedSecondaryLabel = ref('Все');

const secondaryLabels = computed(() =>
	selectedMainLabel.value === 'Курсы'
		? ['Все', 'Нозология', 'Продажи и ассортимент', 'Фармопека']
		: ['Препараты', 'Корпоративные']
);

const selectMainLabel = (label) => {
	selectedMainLabel.value = label;
	if (selectedMainLabel.value == 'Курсы') selectedSecondaryLabel.value = 'Все';
	else selectedSecondaryLabel.value = 'Препараты';
};
const selectSecondaryLabel = (label) => (selectedSecondaryLabel.value = label);
const filteredCourses = computed(() => {
	if (selectedMainLabel.value == 'Курсы' && selectedSecondaryLabel.value == 'Все') {
		return appStore.ongoing.filter(
			(item) =>
				item.course.category_id == 1 || item.course.category_id == 2 || item.course.category_id == 3
		);
	} else {
		return appStore.ongoing.filter(
			(item) => JSON.parse(item.course.category.categoryName).ru == selectedSecondaryLabel.value
		);
	}
});
const isEmpty = computed(() => filteredCourses.value.length == 0);

const darkBtn = computed(() => (appStore.isDark ? 'learn__button--dark' : 'learn__button'));
const darkActiveBtn = computed(() =>
	appStore.isDark ? 'learn__button--dark--active' : 'learn__button--active'
);
</script>

<style lang="scss" scoped>
.courses__nav {
	display: flex;
	flex-direction: column;

	& > * {
		display: flex;
		gap: 2rem;
	}
}
.learn__container {
	height: calc(100vh - 25rem);

	& h1 {
		margin-left: 0;
	}
}
</style>