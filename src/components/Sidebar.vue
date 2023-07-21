<template>
	<div class="sidebar">
		<img class="sidebar__logo" :src="logo" alt="Logo" />
		<div class="sidebar__search">
			<img :src="search" alt="search" />
			<input type="text" name="search" id="search" placeholder="Поиск" />
		</div>
		<nav class="sidebar__nav">
			<img :src="home" alt="home" />
			<RouterLink to="/">Главная</RouterLink>
			<img :src="courses" alt="courses" />
			<RouterLink to="/courses">Курсы</RouterLink>
			<img :src="statistics" alt="statistics" />
			<RouterLink to="/statistics">Статистика</RouterLink>
			<img :src="apteka" alt="apteka" />
			<RouterLink to="/apteka">аптека</RouterLink>
			<img :src="store" alt="store" />
			<RouterLink to="/store">магазин</RouterLink>
			<img :src="mailbox" alt="mailbox" />
			<RouterLink to="/mailbox">письма</RouterLink>
			<img :src="darkTheme" alt="darkTheme" />
			<button>темный режим</button>
			<img :src="settings" alt="settings" />
			<RouterLink to="/settings">настройки</RouterLink>
		</nav>
		<p>Скачивайте наше мобильное приложение</p>
		<img :src="qrcode" alt="qr code" />
		<div class="sidebar__logout">
			<img :src="logout" alt="logout" /> <RouterLink to="/settings">Выход</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import logo from '../assets/Logo-White.svg';
import search from '../assets/icons/teenyicons_search-outline.svg';
import home from '../assets/icons/home.svg';
import courses from '../assets/icons/bank.svg';
import statistics from '../assets/icons/analytics.svg';
import apteka from '../assets/icons/building.svg';
import store from '../assets/icons/store.svg';
import mailbox from '../assets/icons/mailbox.svg';
import darkTheme from '../assets/icons/dark-mode.svg';
import settings from '../assets/icons/settings.svg';
import logout from '../assets/icons/logout.svg';
import qrcode from '../assets/qr-code.svg';
setTimeout(() => {
	document.querySelector('.sidebar').style.transform = 'translateX(0)';
}, 3000);
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
		display: grid;
		grid-template-columns: repeat(2, max-content);
		align-items: center;
		row-gap: 3rem;
		column-gap: 2.4rem;
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
</style>
