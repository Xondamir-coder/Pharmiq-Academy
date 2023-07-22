<template>
	<section class="learn">
		<nav class="learn__nav">
			<RouterLink active-class="link--active" to="current">На изучении</RouterLink>
			<RouterLink active-class="link--active" to="courses">Курсы</RouterLink>
			<RouterLink active-class="link--active" to="mypharmacy">Моя Аптека</RouterLink>
			<RouterLink active-class="link--active" to="completed">Пройденные</RouterLink>
		</nav>
		<RouterView />
	</section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
setTimeout(() => {
	document.querySelector('.learn').style.transform = 'translateY(0)';
}, 100);
</script>

<style lang="scss" scoped>
.link--active {
	color: #fff !important;
	padding: 2rem 1rem !important;
	border-radius: 1rem 1rem 0rem 0rem !important;
	background: var(--brand-solid-primary-pink, #ff736e) !important;
	box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1) !important;
}
.learn {
	transform: translateY(100%);
	transition: transform 0.5s ease;
	padding-top: 1.4rem;
	&__nav {
		padding: 3rem;
		& a {
			transition: all 0.5s ease;
			padding: 1rem;
			color: #545454;
			font-size: 2.4rem;
			font-weight: 500;
			border-radius: 1rem 1rem 0rem 0rem;
			background: #fff;
			box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
