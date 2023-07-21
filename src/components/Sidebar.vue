<template>
	<div class="sidebar">
		<img class="sidebar__logo" :src="logo" alt="Logo" />
		<div class="sidebar__search">
			<img :src="search" alt="search" />
			<input type="text" name="search" id="search" placeholder="Поиск" />
		</div>
		<nav class="sidebar__nav">
			<div :style="`transform: translate(5.4rem, ${pointer} )`" class="sidebar__nav-pointer"></div>
			<RouterLink @click="pointer = 0" active-class="link--active" to="/">
				<img :src="home" alt="home" />Главная</RouterLink
			>

			<RouterLink @click="pointer = '5rem'" active-class="link--active" to="/learn/courses">
				<img :src="learn" alt="learn" />Обучения</RouterLink
			>

			<RouterLink @click="pointer = '10.3rem'" active-class="link--active" to="/statistics"
				><img :src="statistics" alt="statistics" />Статистика</RouterLink
			>
			<RouterLink @click="pointer = '15.4rem'" active-class="link--active" to="/pharmacy">
				<img :src="apteka" alt="apteka" />аптека</RouterLink
			>

			<RouterLink @click="pointer = '20.6rem'" active-class="link--active" to="/store">
				<img :src="store" alt="store" /> магазин</RouterLink
			>

			<RouterLink @click="pointer = '25.8rem'" active-class="link--active" to="/mailbox">
				<img :src="mailbox" alt="mailbox" /> письма</RouterLink
			>

			<button><img :src="darkTheme" alt="darkTheme" />темный режим</button>

			<RouterLink @click="pointer = '36.3rem'" active-class="link--active" to="/settings">
				<img :src="settings" alt="settings" />
				настройки
			</RouterLink>
		</nav>
		<p>Скачивайте наше мобильное приложение</p>
		<img :src="qrcode" alt="qr code" />
		<div class="sidebar__logout">
			<img :src="logout" alt="logout" />
			<RouterLink active-class="link--active" to="/logout">Выход</RouterLink>
		</div>
	</div>
</template>

<script setup>
const changeToLearn = () => {};
import { RouterLink } from 'vue-router';
import logo from '../assets/Logo-White.svg';
import search from '../assets/icons/teenyicons_search-outline.svg';
import home from '../assets/icons/home.svg';
import learn from '../assets/icons/bank.svg';
import statistics from '../assets/icons/analytics.svg';
import apteka from '../assets/icons/building.svg';
import store from '../assets/icons/store.svg';
import mailbox from '../assets/icons/mailbox.svg';
import darkTheme from '../assets/icons/dark-mode.svg';
import settings from '../assets/icons/settings.svg';
import logout from '../assets/icons/logout.svg';
import qrcode from '../assets/qr-code.svg';
import { ref } from 'vue';
const pointer = ref('0');
setTimeout(() => {
	document.querySelector('.sidebar').style.transform = 'translateX(0)';
}, 3500);
</script>

<style lang="scss" scoped>
.sidebar {
	background-color: #f7f7f7;
	width: 30rem;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.3rem;
	transition: all 0.5s ease;
	transform: translateX(-40%);
	&__logo {
		margin: 2rem 0;
		width: 20rem;
		height: 4.6rem;
	}
	&__nav {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		&-pointer {
			position: absolute;
			right: 0;
			transition: all 0.5s ease;
			height: 3.6rem;
			width: 0.8rem;
			border-radius: 0.4rem;
			background: var(--brand-solid-secondary-green, #4db1b1);
		}
		& a {
			transition: all 0.5s ease;
			width: 19rem;
			padding: 0.6rem 0.8rem;
			display: flex;
			align-items: center;
			gap: 2.4rem;
		}
	}
	&__search {
		display: flex;
		gap: 2.4rem;
		border-radius: 1.6rem;
		margin-bottom: 1.3rem;
		background: #fff;
		width: 20rem;
		padding: 1rem 1.6rem;
		&::placeholder {
			color: #000;
		}
		& input {
			width: 100%;
			color: #000;
			border: none;
			font-family: var(--font-base);
			font-size: 1.6rem;
			font-weight: 400;
			border-radius: 1.6rem;
			background: #fff;
			&:focus {
				outline: none;
			}
			&::placeholder {
				color: #000;
			}
		}
	}
	&__nav > * {
		text-transform: capitalize;
	}

	& button {
		display: flex;
		align-items: center;
		width: 19rem;
		padding: 0.6rem 0.8rem;
		gap: 2.2rem;
		outline: none;
		cursor: pointer;
		border: none;
		background-color: transparent;
		color: #000;
		font-family: var(--font-base);
		font-size: 1.6rem;
		font-weight: 400;
		text-transform: capitalize;
	}
	& a {
		text-transform: capitalize;
	}
	& p {
		margin-left: 6.7rem;
	}
	&__logout {
		margin-bottom: 3rem;
		width: 17.5rem;
		display: flex;
		gap: 2.4rem;
	}
}
.link--active {
	border-radius: 1rem;
	background: #fff;
}
</style>
