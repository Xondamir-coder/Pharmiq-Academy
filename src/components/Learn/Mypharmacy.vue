<template>
	<LearnNav
		:props="[
			{ name: 'Препараты', to: '' },
			{ name: 'Корпоративные', to: '' },
		]"
	/>
	<LearnContainer height="calc(100vh - 18rem)" />
</template>

<script setup>
import LearnNav from './LearnNav.vue';
import LearnContainer from './LearnContainer.vue';
</script>
