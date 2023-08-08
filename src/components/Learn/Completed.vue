<template>
	<LearnNav
		:props="[
			{ name: 'Курсы', to: '' },
			{ name: 'Моя Аптека', to: 'mypharmacy' },
		]"
	/>
	<LearnNav
		:props="[
			{ name: 'Все', to: '' },
			{ name: 'Нозология', to: '' },
			{ name: 'Курсы', to: 'courses' },
			{ name: 'Нейм', to: '' },
			{ name: 'Нейм', to: '' },
		]"
	/>
	<LearnContainer />
</template>

<script setup>
import LearnNav from './LearnNav.vue';
import LearnContainer from './LearnContainer.vue';
</script>
