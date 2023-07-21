<template>
	<div class="container">
		<Sidebar />
		<main><RouterView /></main>
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped>
.container {
	display: flex;
}
main {
	flex: 1;
	border-radius: 5rem 0rem 0rem 5rem;
	background-color: #fff;
}
</style>
