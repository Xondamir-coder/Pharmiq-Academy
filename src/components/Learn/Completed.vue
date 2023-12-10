<template>
	<div class="courses__nav">
		<div>
			<button
				class="learn__button"
				v-for="mainLabel in mainLabels"
				:key="mainLabel"
				:class="[selectedMainLabel === mainLabel ? darkActiveBtn : '', darkBtn]"
				@click="selectMainLabel(mainLabel)">
				{{ mainLabel }}
			</button>
		</div>
		<div>
			<button
				class="learn__button"
				v-for="secondaryLabel in secondaryLabels"
				:key="secondaryLabel"
				:class="[selectedSecondaryLabel === secondaryLabel ? darkActiveBtn : '', darkBtn]"
				@click="selectSecondaryLabel(secondaryLabel)">
				{{ secondaryLabel }}
			</button>
		</div>
	</div>
	<div class="learn__container" v-if="!isEmpty">
		<CourseCard v-for="item in filteredCourses" :key="item.course.id" :course="item.course" />
	</div>
	<h1 class="courses__empty" :style="textColor" v-else>У вас нет пройденных курсов</h1>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useAppStore } from '../../appStore';
import CourseCard from './CourseCard.vue';
import { textColor } from '../../composables/useColor';
import i18n from '../../locales';

const appStore = useAppStore();
const mainLabels = computed(() => [
	i18n.global.t('learn_courses'),
	i18n.global.t('learn_pharmacy'),
]);
const selectedMainLabel = ref(i18n.global.t('learn_courses'));
const selectedSecondaryLabel = ref(i18n.global.t('learn_all'));

const secondaryLabels = computed(() =>
	selectedMainLabel.value === i18n.global.t('learn_courses')
		? [
				i18n.global.t('learn_all'),
				i18n.global.t('learn_nosology'),
				i18n.global.t('learn_sell'),
				i18n.global.t('learn_farmopeka'),
		  ]
		: [i18n.global.t('learn_drugs'), i18n.global.t('learn_corporate')]
);

const selectMainLabel = function (label) {
	selectedMainLabel.value = label;
	if (selectedMainLabel.value == i18n.global.t('learn_courses'))
		selectedSecondaryLabel.value = i18n.global.t('learn_all');
	else selectedSecondaryLabel.value = i18n.global.t('learn_drugs');
};
const selectSecondaryLabel = label => (selectedSecondaryLabel.value = label);
const filteredCourses = computed(() => {
	if (
		selectedMainLabel.value == i18n.global.t('learn_courses') &&
		selectedSecondaryLabel.value == i18n.global.t('learn_all')
	) {
		return appStore.passed.filter(
			item =>
				item.course.category_id == 1 ||
				item.course.category_id == 2 ||
				item.course.category_id == 3
		);
	} else {
		return appStore.passed.filter(
			item =>
				JSON.parse(item.course.category.categoryName)[i18n.global.locale] ==
				selectedSecondaryLabel.value
		);
	}
});
const isEmpty = computed(() => filteredCourses.value.length == 0);

const darkBtn = computed(() => (appStore.isDark ? 'learn__button--dark' : 'learn__button'));
const darkActiveBtn = computed(() =>
	appStore.isDark ? 'learn__button--dark--active' : 'learn__button--active'
);

watchEffect(() => {
	selectedMainLabel.value = i18n.global.t('learn_courses');
	selectedSecondaryLabel.value = i18n.global.t('learn_all');
});
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
