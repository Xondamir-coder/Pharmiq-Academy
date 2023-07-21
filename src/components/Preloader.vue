<!-- <template>
	<div class="preloader">
		<svg>
			<g>
				<path d="M 50,100 A 1,1 0 0 1 50,0" />
			</g>
			<g>
				<path d="M 50,75 A 1,1 0 0 0 50,-25" />
			</g>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style="stop-color: #4db1b1; stop-opacity: 1" />
					<stop offset="100%" style="stop-color: #4b96dc; stop-opacity: 1" />
				</linearGradient>
			</defs>
		</svg>
	</div>
</template>

<script setup>
setTimeout(() => {
	document.querySelector('.preloader').style.display = 'none';
	document.querySelector('body').style.overflow = 'visible';
}, 3000);
</script>

<style lang="scss">
$transition-duration: 2s;
$path-length: 157px;
body {
	overflow: hidden;
}
.preloader {
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: #effffe;
}

svg {
	overflow: visible;
	width: 100px;
	height: 150px;

	g {
		animation: slide $transition-duration linear infinite;

		&:nth-child(2) {
			animation-delay: calc($transition-duration / 4);

			path {
				animation-delay: calc($transition-duration / 4);
				stroke-dasharray: 0px $path-length + 1;
				stroke-dashoffset: 1px;
			}
		}
	}

	path {
		stroke: url(#gradient);
		stroke-width: 20px;
		stroke-linecap: round;
		fill: none;
		stroke-dasharray: 0 $path-length;
		stroke-dashoffset: 0;
		animation: escalade $transition-duration cubic-bezier(0.8, 0, 0.2, 1) infinite;
	}
}

@keyframes slide {
	0% {
		transform: translateY(-50px);
	}
	100% {
		transform: translateY(50px);
	}
}

@keyframes escalade {
	0% {
		stroke-dasharray: 0 $path-length;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: $path-length $path-length;
		stroke-dashoffset: 0;
	}
	100% {
		stroke-dasharray: $path-length $path-length;
		stroke-dashoffset: -($path-length - 1);
	}
}
</style> -->
<template>
	<div class="preloader">
		<img id="logo" :src="logo" alt="logo" />
		<div id="name">
			<h1>PharmIQ</h1>
			<h2>ACADEMY</h2>
		</div>
	</div>
</template>
<script setup>
import logo from '../../public/favicon.ico';
document.querySelector('body').style.overflow = 'hidden';
setTimeout(() => {
	document.querySelector('.preloader').style.display = 'none';
	document.querySelector('body').style.overflow = 'visible';
}, 3000);
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
