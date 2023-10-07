<template>
	<Preloader />
	<div class="container" :style="bodyDarkMode">
		<Sidebar />
		<main :style="mainDarkMode"><RouterView /></main>
		<Profile />
	</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAppStore } from './appStore';
import Sidebar from './components/Sidebar.vue';
import Preloader from './components/Preloader.vue';
import Profile from './components/Profile.vue';

const appStore = useAppStore();

const bodyDarkMode = computed(() => ({
	backgroundColor: appStore.isDark ? '#000' : '#F7F7F7',
}));
const mainDarkMode = computed(() => ({
	backgroundColor: appStore.isDark ? '#000' : '#fff',
}));

onMounted(() => appStore.fetchData());
</script>

<style lang="scss" scoped>
.container {
	display: flex;
}
main {
	@media only screen and (max-width: 1450px) {
		width: calc(100vw - 20rem - 25rem);
		transform: translateX(23rem);
	}
	height: 100vh;
	padding: 0 3rem;
	width: calc(100vw - 30rem - 30rem);
	border-radius: 3rem 0rem 0rem 3rem;
	background: #fff;
	transform: translateX(30rem);
	user-select: none;
}
</style>
