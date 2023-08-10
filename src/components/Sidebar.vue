<template>
	<div class="sidebar">
		<img class="sidebar__logo" :src="logo" alt="Logo" />
		<div class="sidebar__search">
			<img style="width: 2.4rem; height: 2.4rem" v-if="isDark" :src="searchWhite" alt="search" />
			<input v-if="isDark" type="text" name="searchBlack" id="searchBlack" placeholder="Поиск" />
			<img v-if="!isDark" :src="search" alt="search" />
			<input v-if="!isDark" type="text" name="search" id="search" placeholder="Поиск" />
		</div>
		<div :style="`transform: translateY(${pointer}px)`" class="sidebar__nav-pointer"></div>
		<nav class="sidebar__nav">
			<RouterLink
				v-for="(link, index) in navLinks"
				:key="index"
				@click="setPointer(index)"
				:to="link.to"
				:active-class="isDark ? 'link--active--black' : 'link--active'"
			>
				<img v-if="isDark" :src="link.iconWhite" :alt="link.text" />
				<img v-else :src="link.icon" :alt="link.text" />{{ link.text }}
			</RouterLink>
			<input type="checkbox" name="darkmode-toggle" id="darkmode-toggle" />
			<label @click="changeTheme" for="darkmode-toggle">
				<svg class="sun" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
						stroke="yellow"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<svg class="moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z"
						fill="#ffffff"
					></path>
					<path
						d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z"
						fill="#ffffff"
					></path>
					<path
						d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
						fill="#ffffff"
					></path>
				</svg>
			</label>
		</nav>
		<p>Скачивайте наше мобильное приложение</p>
		<img class="sidebar__qrcode" :src="qrcode" alt="qr code" />
		<div class="sidebar__logout">
			<img v-if="isDark" :src="logoutWhite" alt="logout" />
			<img v-else :src="logout" alt="logout" />
			<RouterLink active-class="link--active" to="/logout">Выход</RouterLink>
		</div>
	</div>
</template>
<script setup>
import qrcode from '../assets/qr-code.webp';
import logo from '../assets/Logo-White.svg';
import search from '../assets/icons/teenyicons_search-outline.svg';
import searchWhite from '../assets/icons/search-white.svg';
import home from '../assets/icons/home.svg';
import homeWhite from '../assets/icons/home-white.svg';
import bank from '../assets/icons/bank.svg';
import bankWhite from '../assets/icons/bank-white.svg';
import statistics from '../assets/icons/analytics.svg';
import statisticsWhite from '../assets/icons/analytics-white.svg';
import pharmacy from '../assets/icons/building.svg';
import pharmacyWhite from '../assets/icons/building-white.svg';
import store from '../assets/icons/store.svg';
import storeWhite from '../assets/icons/store-white.svg';
import mailbox from '../assets/icons/mailbox.svg';
import mailboxWhite from '../assets/icons/mailbox-white.svg';
import settings from '../assets/icons/settings.svg';
import settingsWhite from '../assets/icons/settings-white.svg';
import logout from '../assets/icons/logout.svg';
import logoutWhite from '../assets/icons/logout-white.svg';
const isDark = ref(false);
const changeTheme = () => {
	const sidebar = document.querySelector('.sidebar');
	const body = document.querySelector('body');
	const profile = document.querySelector('.home__profile');
	if (!isDark.value) {
		const searchBar = document.getElementById('search');
		body.style.backgroundColor = '#1A1A1A';
		body.style.color = 'white';
		document.querySelector('main').style.backgroundColor = '#000';
		profile.style.backgroundColor = '#000';
		profile.style.boxShadow = '-8px 0px 20px 0px rgba(255, 255, 255, 0.10)';
		document.querySelector('.sidebar__search').style.backgroundColor = '#000';
		searchBar.style.backgroundColor = '#000';
		searchBar.style.color = 'white';
		sidebar.querySelectorAll('a').forEach((link) => {
			link.style.color = 'white';
		});
		sidebar.style.backgroundColor = '#1a1a1a';
		isDark.value = true;
	} else {
		body.style.backgroundColor = '#f7f7f7';
		body.style.color = '#000';
		document.querySelector('main').style.backgroundColor = '#fff';
		profile.style.backgroundColor = '#fff';
		profile.style.boxShadow = '-8px 0px 20px 0px rgba(0, 0, 0, 0.05)';
		document.querySelector('.sidebar__search').style.backgroundColor = '#fff';
		sidebar.querySelectorAll('a').forEach((link) => {
			link.style.color = '#000';
		});
		sidebar.style.backgroundColor = '#f7f7f7';
		isDark.value = false;
	}
};
setTimeout(() => {
	document.querySelector('.sidebar').style.transform = 'translateX(0)';
}, 3500);

import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';

const navLinks = [
	{ to: '/', icon: home, iconWhite: homeWhite, text: 'Главная' },
	{ to: '/learn', icon: bank, iconWhite: bankWhite, text: 'Обучения' },
	{ to: '/statistics', icon: statistics, iconWhite: statisticsWhite, text: 'Статистика' },
	{ to: '/pharmacy', icon: pharmacy, iconWhite: pharmacyWhite, text: 'Аптека' },
	{ to: '/store', icon: store, iconWhite: storeWhite, text: 'Магазин' },
	{ to: '/mailbox', icon: mailbox, iconWhite: mailboxWhite, text: 'Письма' },
	{ to: '/settings', icon: settings, iconWhite: settingsWhite, text: 'Настройки' },
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
label {
	margin-left: 1rem;
	width: 8rem;
	height: 3rem;
	position: relative;
	display: block;
	padding: 0.3rem;
	background: rgb(124, 202, 250);
	border-radius: 10rem;
	box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
	cursor: pointer;
	&::after {
		content: '';
		width: 2.6rem;
		height: 80%;
		position: absolute;
		left: 6px;
		background: white;
		border-radius: 10rem;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
		transition: all 0.6s;
	}
	&:active::after {
		width: 3.4rem;
	}
	& svg {
		position: absolute;
		width: 3.2rem;
		height: 80%;
		transition: all 0.6s;
		&.sun {
			right: 3px;
			fill: #fff176;
		}
		&.moon {
			transform: scale(0.7) translateX(6px);
			left: 3px;
			fill: #fff;
		}
	}
}
#darkmode-toggle {
	display: none;
	width: 0;
	height: 0;
	visibility: hidden;
	&:checked + label {
		background: #242424;
		&::after {
			left: 7.4rem;
			transform: translateX(-100%);
		}
		& svg.sun {
			transform: scale(0.7) translateX(-6px);
		}
		& svg.moon {
			transform: scale(1);
		}
	}
}

#searchBlack {
	width: 100%;
	color: white;
	border: none;
	font-family: var(--font-base);
	font-size: 1.6rem;
	font-weight: 400;
	border-radius: 1.6rem;
	background-color: #000;
	@media only screen and (max-height: 650px) {
		font-size: 1.3rem;
	}
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: white;
	}
}
.sidebar {
	@media only screen and (max-width: 1450px) {
		width: 23rem;
	}
	@media only screen and (max-height: 870px) {
		gap: 0;
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
		transform: translateX(0.3rem);
		width: 20rem;
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

		& img {
			margin-left: 0.2rem;
		}
	}

	& p {
		margin-left: 6.7rem;
		@media only screen and (max-width: 1450px) {
			margin-left: 3.7rem;
		}
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
.link--active--black {
	border-radius: 1rem;
	background: #000;
}
</style>
