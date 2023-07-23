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
	width: 70vw;
	border-radius: 5rem 0rem 0rem 5rem;
	background-color: #fff;
	transform: translateX(30rem);
}
</style>
