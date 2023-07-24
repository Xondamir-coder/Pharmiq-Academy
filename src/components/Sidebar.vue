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

			<RouterLink @click="pointer = '4.6rem'" active-class="link--active" to="/learn">
				<img :src="learn" alt="learn" />Обучения</RouterLink
			>

			<RouterLink @click="pointer = '9.2rem'" active-class="link--active" to="/statistics"
				><img :src="statistics" alt="statistics" />Статистика</RouterLink
			>
			<RouterLink @click="pointer = '13.6rem'" active-class="link--active" to="/pharmacy">
				<img :src="apteka" alt="apteka" />аптека</RouterLink
			>

			<RouterLink @click="pointer = '18.2rem'" active-class="link--active" to="/store">
				<img :src="store" alt="store" /> магазин</RouterLink
			>

			<RouterLink @click="pointer = '22.6rem'" active-class="link--active" to="/mailbox">
				<img :src="mailbox" alt="mailbox" /> письма</RouterLink
			>

			<button><img :src="darkTheme" alt="darkTheme" />темный режим</button>

			<RouterLink @click="pointer = '32.2rem'" active-class="link--active" to="/settings">
				<img :src="settings" alt="settings" />
				настройки
			</RouterLink>
		</nav>
		<p>Скачивайте наше мобильное приложение</p>
		<img class="sidebar__qrcode" :src="qrcode" alt="qr code" />
		<div class="sidebar__logout">
			<img :src="logout" alt="logout" />
			<RouterLink active-class="link--active" to="/logout">Выход</RouterLink>
		</div>
	</div>
</template>

<script setup>
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
	@media only screen and (max-height: 870px) {
		gap: 0;
	}
	@media only screen and (max-height: 700px) {
		font-size: 1.3rem;
	}
	@media only screen and (max-height: 560px) {
		font-size: 1.1rem;
	}
	@media only screen and (max-height: 530px) {
		gap: 1rem;
	}
	@media only screen and (max-height: 450px) {
		gap: 0.5rem;
	}
	@media only screen and (max-height: 430px) {
		gap: 0;
	}
	position: fixed;
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
		@media only screen and (max-height: 765px) {
			margin: 1rem 0;
		}
		@media only screen and (max-height: 700px) {
			width: 16rem;
			height: 3rem;
		}
	}
	&__nav {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		@media only screen and (max-height: 765px) {
			gap: 1rem;
		}
		@media only screen and (max-height: 650px) {
			gap: 0.4rem;
			justify-content: space-between;
		}
		@media only screen and (max-height: 530px) {
			flex-direction: row;
			flex-wrap: wrap;
			padding: 1rem;
		}
		&-pointer {
			position: absolute;
			right: 0;
			transition: all 0.5s ease;
			height: 3.6rem;
			width: 0.8rem;
			border-radius: 0.4rem;
			background: var(--brand-solid-secondary-green, #4db1b1);
		}

		& img {
			width: 2.4rem;
			height: 2.4rem;
			@media only screen and (max-height: 700px) {
				width: 2rem;
				height: 2rem;
			}
		}
		& a {
			transition: all 0.5s ease;
			width: 19rem;
			padding: 0.6rem 0.8rem;
			display: flex;
			align-items: center;
			gap: 2.4rem;

			@media only screen and (max-height: 700px) {
				padding: 0.5rem 0.8rem;
			}
			@media only screen and (max-height: 530px) {
				width: 45%;
			}
			&:hover {
				transform: translateX(1.5rem);
			}
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
		@media only screen and (max-height: 570px) {
			padding: 0.5rem 0.8rem;
			margin-bottom: 0;
		}
		& img {
			width: 2.4rem;
			height: 2.4rem;
			@media only screen and (max-height: 650px) {
				width: 2rem;
				height: 2rem;
			}
		}
		@media only screen and (max-height: 650px) {
			padding: 0.5rem 0.8rem;
			width: 60%;
		}
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
			@media only screen and (max-height: 650px) {
				font-size: 1.3rem;
			}
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
		gap: 2rem;
		outline: none;
		cursor: pointer;
		border: none;
		background-color: transparent;
		color: #000;
		font-family: var(--font-base);
		font-size: 1.6rem;
		font-weight: 400;
		text-transform: capitalize;
		@media only screen and (max-height: 700px) {
			font-size: 1.3rem;
		}
		@media only screen and (max-height: 560px) {
			font-size: 1.1rem;
		}
		@media only screen and (max-height: 530px) {
			width: 40%;
			justify-content: space-between;
		}
	}

	& p {
		margin-left: 6.7rem;
		@media only screen and (max-height: 530px) {
			margin-left: 0;
		}
	}
	&__logout {
		margin-bottom: 3rem;
		width: 17.5rem;
		display: flex;
		align-items: center;
		gap: 2.4rem;
		@media only screen and (max-height: 765px) {
			margin: 0;
		}
		& img {
			width: 2.4rem;
			height: 2.4rem;
			@media only screen and (max-height: 700px) {
				width: 2rem;
				height: 2rem;
			}
		}
	}
	&__qrcode {
		width: 20rem;
		height: 20rem;
		@media only screen and (max-height: 870px) {
			margin-left: -3rem;
			height: 15rem;
			width: 15rem;
		}
		@media only screen and (max-height: 560px) {
			margin-left: -5rem;
			width: 13rem;
			height: 13rem;
		}
	}
}
.link--active {
	border-radius: 1rem;
	background: #fff;
}
</style>
