<template>
	<div class="sidebar">
		<img class="sidebar__logo" :src="logo" alt="Logo" />
		<div class="sidebar__search">
			<img :src="search" alt="search" />
			<input type="text" name="search" id="search" placeholder="Поиск" />
		</div>
		<div :style="`transform: translateY(${pointer}px)`" class="sidebar__nav-pointer"></div>
		<nav class="sidebar__nav">
			<RouterLink
				v-for="(link, index) in navLinks"
				:key="index"
				@click="setPointer(index)"
				:to="link.to"
				active-class="link--active"
			>
				<img :src="link.icon" :alt="link.text" />{{ link.text }}
			</RouterLink>
			<button><img :src="darkTheme" alt="dark theme" />Темный режим</button>
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
import logo from '../assets/Logo-White.svg';
import search from '../assets/icons/teenyicons_search-outline.svg';
import home from '../assets/icons/home.svg';
import learn from '../assets/icons/bank.svg';
import statistics from '../assets/icons/analytics.svg';
import pharmacy from '../assets/icons/building.svg';
import store from '../assets/icons/store.svg';
import mailbox from '../assets/icons/mailbox.svg';
import darkTheme from '../assets/icons/dark-mode.svg';
import settings from '../assets/icons/settings.svg';
import logout from '../assets/icons/logout.svg';
import qrcode from '../assets/qr-code.svg';
setTimeout(() => {
	document.querySelector('.sidebar').style.transform = 'translateX(0)';
}, 3500);

import { RouterLink } from 'vue-router';
import { ref, onMounted, nextTick } from 'vue';

const navLinks = [
	{ to: '/', icon: home, text: 'Главная' },
	{ to: '/learn', icon: learn, text: 'Обучения' },
	{ to: '/statistics', icon: statistics, text: 'Статистика' },
	{ to: '/pharmacy', icon: pharmacy, text: 'Аптека' },
	{ to: '/store', icon: store, text: 'Магазин' },
	{ to: '/mailbox', icon: mailbox, text: 'Письма' },
	{ to: '/settings', icon: settings, text: 'Настройки' },
];
const sidebarNav = ref(null); // A ref to store the sidebar__nav element
const pointer = ref(0); // Initialize the pointer to 0

const setPointer = (index) => {
	const linkElement = navLinkElements.value[index];
	if (linkElement && sidebarNav.value) {
		// Get the height of the sidebar__nav element
		const sidebarHeight = sidebarNav.value.getBoundingClientRect().y;
		pointer.value = sidebarHeight - 18 + linkElement.offsetTop + linkElement.offsetHeight / 2;
	}
};

// A ref to hold the references to the RouterLink elements
const navLinkElements = ref([]);

onMounted(() => {
	// Populating the ref with the references to the RouterLink elements
	navLinkElements.value = document.querySelectorAll('a');

	// Set the sidebar__nav element reference
	sidebarNav.value = document.querySelector('.sidebar__nav');

	// Use nextTick to handle the height adjustment
	if (sidebarNav.value) {
		pointer.value = sidebarNav.value.getBoundingClientRect().y;
	}
});
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
	justify-content: space-evenly;
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
			top: 0;
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
			width: 12.6rem;
			gap: 0.3rem;
		}
		& img {
			margin-left: 0.2rem;
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
