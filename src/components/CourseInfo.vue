<template>
	<div class="info__box">
		<div class="info">
			<img :src="play" alt="play" />
			<p>{{ numberOfVids }} видеоурок</p>
			<h1 :style="`font-size: ${fontSize}rem`">{{ time }} минут</h1>
		</div>
		<div class="info__bar"></div>
	</div>
</template>

<script setup>
import play from '../assets/icons/play.svg';
const { numberOfVids, time, fontSize } = defineProps(['numberOfVids', 'time', 'fontSize']);
</script>

<style lang="scss" scoped>
.info {
	display: flex;
	gap: 0.52rem;
	align-items: center;
	color: #61c1c0;
	font-size: 1.2rem;
	font-weight: 500;
	& h1 {
		font-size: 2rem;
		font-weight: 700;
		margin-left: auto;
	}
	&__bar {
		margin-top: 1rem;
		width: 100%;
		height: 0.7rem;
		border-radius: 0.5rem;
		border: 1px solid #61c1c0;
		background: #effffe;
		&::before {
			content: '';
			display: block;
			width: 60%;
			height: 100%;
			border-radius: 0.5rem;
			background-color: #61c1c0;
		}
	}
}
</style>
