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
				<svg
					class="sun"
					width="800px"
					height="800px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<svg
					class="moon"
					width="800px"
					height="800px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
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
import qrcode from '../assets/qr-code.svg';
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
	background: #ebebeb;
	border-radius: 10rem;
	box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
	cursor: pointer;
	&::after {
		content: '';
		width: 2.8rem;
		height: 80%;
		position: absolute;
		left: 6px;
		background: linear-gradient(180deg, #ffcc89, #d8860b);
		border-radius: 10rem;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
		transition: all 0.3s;
	}
	&:active::after {
		width: 3.4rem;
	}
	& svg {
		position: absolute;
		width: 3.2rem;
		height: 80%;
		z-index: 2;
		&.sun {
			left: 3px;
			fill: #fff176;
			transition: all 0.3s;
		}
		&.moon {
			right: 3px;
			fill: #7e7e7e;
			transition: all 0.3s;
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
			background: linear-gradient(180deg, #777, #3a3a3a);
		}
		& svg.sun {
			fill: #7e7e7e;
		}
		& svg.moon {
			fill: var(--color-primary);
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
