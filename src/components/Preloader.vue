<template>
	<div v-if="appStore.showPreloader" class="preloader">
		<img id="logo" src="/favicon.ico" alt="logo" />
		<div id="name">
			<h1>PharmIQ</h1>
			<h2>ACADEMY</h2>
		</div>
	</div>
</template>

<script setup>
/* Pinia */
import { useAppStore } from '../appStore.js';
const appStore = useAppStore();

import { onBeforeMount, onBeforeUnmount } from 'vue';

onBeforeMount(() => {
	document.body.style.overflow = 'hidden';

	setTimeout(() => {
		appStore.setShowPreloader(false);
	}, 3500);
});

onBeforeUnmount(() => {
	document.body.style.overflow = 'visible';
});
</script>

<style scoped lang="scss">
#name {
	position: absolute;
	bottom: 29.99999%;
	color: #007382;
	text-align: center;
	animation: scaleAnimation 1.2s infinite ease;
}
h1 {
	font-size: 7rem;
}
h2 {
	font-weight: 400;
}
.preloader {
	width: 100vw;
	z-index: 2;
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: #effffe;
}
#logo {
	width: 100px; /* Adjust the width and height of your logo */
	height: 100px;
	animation: jumpAnimation 3s infinite ease;
}
@keyframes jumpAnimation {
	0% {
		transform: translate(0, 0) rotate(0);
	}
	15% {
		transform: translate(5rem, -5rem) rotate(90deg);
	}
	30% {
		transform: translate(10rem, 0) rotate(180deg);
	}
	45% {
		transform: translate(0, 0) rotate(0);
	}
	60% {
		transform: translate(-5rem, -5rem) rotate(90deg);
	}
	80% {
		transform: translate(-10rem, 0) rotate(180deg);
	}
	100% {
		transform: translate(0, 0) rotate(0);
	}
}
@keyframes scaleAnimation {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}
</style>
