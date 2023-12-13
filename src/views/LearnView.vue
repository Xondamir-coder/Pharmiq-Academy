<template>
	<section :style="showSection" class="learn">
		<nav class="learn__nav">
			<RouterLink
				active-class="link--active"
				:style="btnStyle"
				v-for="route in routes"
				:key="route.name"
				:to="route.to">
				{{ route.name }}
			</RouterLink>
			<RouterLink active-class="link--active" to="/learn/search" v-if="isSearched">
				{{ i18n.global.t('learn_search') }}
			</RouterLink>
		</nav>
		<RouterView />
	</section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import useAppear from '../composables/useAppear';
import i18n from '../locales';
import { useAppStore } from '../appStore';

const appStore = useAppStore();
const routes = computed(() => [
	{
		to: 'ongoing',
		name: i18n.global.t('learn_current'),
	},
	{
		to: 'courses',
		name: i18n.global.t('learn_courses'),
	},
	{
		to: 'mypharmacy',
		name: i18n.global.t('learn_pharmacy'),
	},
	{
		to: 'completed',
		name: i18n.global.t('learn_passed'),
	},
]);
const isSearched = computed(() => appStore.searchedCourses && appStore.searchedCourses.length > 0);
const appear = ref(false);

const showSection = computed(() => ({
	transform: appear.value ? 'translateY(0)' : 'translateY(100%)',
}));
const btnStyle = computed(() => ({
	backgroundColor: appStore.isDark ? '#1A1A1A' : '',
}));

onMounted(() => useAppear(appear));
</script>

<style lang="scss" scoped>
.link--active {
	color: #fff !important;
	background-color: #ff736e !important;
	padding-top: 3rem !important;
	z-index: -10;
	@for $i from 1 through 4 {
		&:nth-child(#{$i})::before {
			height: 100%;
		}
	}
}
.learn {
	transform: translateY(100%);
	transition: transform 0.5s ease;
	padding-top: 1.4rem;
	&__nav {
		padding: 3rem 0;
		margin-left: 1rem;
		& a {
			z-index: 2;
			transition: all 0.5s ease;
			padding: 1rem;
			color: #545454;
			font-size: 2rem;
			font-weight: 500;
			border-radius: 1rem 1rem 0rem 0rem;
			box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
			position: relative;
			&::before {
				content: '';
				position: absolute;
				display: block;
				transition: all 0.5s ease;
				border-radius: 1rem 1rem 0rem 0rem;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 0;
				z-index: -1;
			}
		}
	}
}
</style>
