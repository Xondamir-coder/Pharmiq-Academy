<template>
	<div class="learn__nav--2">
		<RouterLink
			v-for="(link, index) in props"
			:key="index"
			:active-class="index === 0 ? 'link--active' : ''"
			class="learn--link"
			:to="link.to"
		>
			{{ link.name }}
		</RouterLink>
	</div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>

<style lang="scss" scoped>
.learn__nav--2 {
	margin-left: 1rem;
	display: flex;
	gap: 2rem;
	margin-bottom: 2rem;
}
.link--active {
	color: #fff !important;
	padding: 1.2rem 2.4rem !important;
	border-radius: 1rem !important;
	background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%)) !important;
}
a {
	color: var(--color-secondary-green);
}
</style>
