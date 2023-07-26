<template>
	<Preloader />
	<div class="container">
		<Sidebar />
		<main><RouterView /></main>
		<Profile />
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import Preloader from './components/Preloader.vue';
import { RouterView } from 'vue-router';
import Profile from './components/Profile.vue';
</script>

<style lang="scss" scoped>
.container {
	display: flex;
}
main {
	height: 100vh;
	padding: 0 3rem;
	width: 70vw;
	border-radius: 3rem 0rem 0rem 3rem;
	background: #fff;
	transform: translateX(30rem);
	user-select: none;
}
</style>
