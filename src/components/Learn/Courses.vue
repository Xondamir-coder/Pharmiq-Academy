<template>
	<LearnNav
		:props="[
			{ name: 'Все', to: '' },
			{ name: 'Нозология', to: '' },
			{ name: 'Название', to: 'courses' },
			{ name: 'Название', to: '' },
		]"
	/>
	<LearnContainer height="calc(100vh - 18rem)" />
</template>

<script setup>
import LearnNav from './LearnNav.vue';
import LearnContainer from './LearnContainer.vue';
</script>
