<template>
	<Preloader />
	<div class="container">
		<Sidebar />
		<main><RouterView /></main>
		<Profile />
	</div>
</template>

<script setup>
import { useAppStore } from './appStore.js';
import Sidebar from './components/Sidebar.vue';
import Preloader from './components/Preloader.vue';
import { RouterView } from 'vue-router';
import Profile from './components/Profile.vue';
import { onMounted } from 'vue';

const store = useAppStore();

onMounted(() => {
	store.fetchAPI();
});
</script>

<style lang="scss" scoped>
.container {
	display: flex;
}
main {
	@media only screen and (max-width: 1450px) {
		width: calc(100vw - 20rem - 25rem);
		transform: translateX(22rem);
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
