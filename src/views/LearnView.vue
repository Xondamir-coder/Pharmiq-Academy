<template>
	<section class="learn">
		<nav class="learn__nav">
			<RouterLink ref="link1" active-class="link--active" to="current">На изучении</RouterLink>
			<RouterLink ref="link2" active-class="link--active" to="courses">Курсы</RouterLink>
			<RouterLink ref="link3" active-class="link--active" to="mypharmacy">Моя Аптека</RouterLink>
			<RouterLink ref="link4" active-class="link--active" to="completed">Пройденные</RouterLink>
		</nav>
		<RouterView />
	</section>
</template>

<script setup>
setTimeout(() => {
	document.querySelector('.learn').style.transform = 'translateY(0)';
}, 100);
import { ref, watchEffect } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();
const activeLinkRef = ref(null);

watchEffect(() => {
	// Find the current active link element based on the route
	const activeLinkIndex = ['current', 'courses', 'mypharmacy', 'completed'].indexOf(route.name);
	activeLinkRef.value = activeLinkIndex !== -1 ? activeLinkIndex + 1 : null;
});
</script>

<style lang="scss" scoped>
.link--active {
	color: #fff !important;
	padding-top: 3rem !important;
	height: 10rem !important;
	z-index: -10;
	@for $i from 1 through 4 {
		&:nth-child(#{$i})::before {
			height: 100%;
		}
	}
}
.learn {
	transform: translateY(100%);
	transition: transform 0.5s ease;
	padding-top: 1.4rem;
	&__nav {
		padding: 3rem 0;
		& a {
			z-index: 2;
			transition: all 0.5s ease;
			padding: 1rem;
			color: #545454;
			font-size: 2.4rem;
			font-weight: 500;
			border-radius: 1rem 1rem 0rem 0rem;
			box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
			position: relative;
			&::before {
				content: '';
				position: absolute;
				display: block;
				transition: all 0.5s ease;
				border-radius: 1rem 1rem 0rem 0rem;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 0;
				background-color: #ff736e;
				z-index: -1;
			}
		}
	}
}
</style>
