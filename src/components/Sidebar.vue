<template>
	<div class="sidebar" :style="[sidebarStyle, textColor]">
		<RouterLink to="/">
			<Logo class="sidebar__logo" />
		</RouterLink>

		<div class="sidebar__search" :style="darkSearch">
			<Search />
			<input
				@input="navigateToCourses"
				type="text"
				:placeholder="i18n.global.t('search')"
				:style="darkInput"
				v-model="appStore.query" />
		</div>

		<!-- <div class="sidebar__pointer" :style="pointerStyle"></div> -->
		<nav class="sidebar__nav">
			<RouterLink
				class="sidebar__link"
				v-for="(link, index) in navLinks"
				:key="index"
				:to="link.to"
				:active-class="linkActive">
				<component :is="link.icon"></component>
				{{ link.label }}
			</RouterLink>
			<RouterLink class="sidebar__link" to="/mailbox" :active-class="linkActive">
				<Mailbox />
				{{ i18n.global.t('mailbox_link') }}
				<div class="link__oval">
					{{ totalNotifications }}
				</div>
			</RouterLink>
			<div class="darkmode">
				<input
					type="checkbox"
					name="darkmode-toggle"
					id="darkmode-toggle"
					:checked="appStore.isDark"
					@change="toggleDarkMode" />
				<label for="darkmode-toggle" class="darkmode__label">
					<Sun class="sun" />
					<Moon class="moon" />
				</label>
				{{ i18n.global.t('regime') }}
			</div>
			<input
				type="checkbox"
				name="lang-toggle"
				id="lang-toggle"
				@change="toggleLanguage"
				:checked="i18n.global.locale == 'uz'" />
			<div class="sidebar__lang">
				<label for="lang-toggle" class="lang__label">
					<FlagUzbek />
					<FlagRussian />
				</label>
				{{ i18n.global.t('lang_label') }}
			</div>
		</nav>

		<p>{{ i18n.global.t('download_text') }}</p>
		<img class="sidebar__qrcode" src="../assets/qr-code.webp" alt="qr code" />
		<a href="javascript:void(0);" class="sidebar__link" @click="logout"
			><Logout />{{ i18n.global.t('quit_link') }}</a
		>
	</div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAppStore } from '../appStore';
import {
	Logo,
	Search,
	Home,
	Learn,
	Statistics,
	Pharmacy,
	Store,
	Mailbox,
	Logout,
	Sun,
	Moon,
	FlagRussian,
	FlagUzbek,
} from '../assets/icons';
import { textColor } from '../composables/useColor';
import i18n from '../locales';

const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
const navLinks = computed(() => [
	{ label: i18n.global.t('home_link'), to: '/', icon: Home },
	{ label: i18n.global.t('learn_link'), to: '/learn', icon: Learn },
	{ label: i18n.global.t('stats_link'), to: '/statistics', icon: Statistics },
	{ label: i18n.global.t('pharmacy_link'), to: '/pharmacy', icon: Pharmacy },
	{ label: i18n.global.t('store_link'), to: '/store', icon: Store },
]);

const toggleDarkMode = function () {
	appStore.isDark = !appStore.isDark;
	localStorage.setItem('isDark', appStore.isDark);
};
const logout = function () {
	localStorage.removeItem('token');
	window.location.href = 'https://go.pharmiq.uz/login';
};
const toggleLanguage = function () {
	i18n.global.locale = i18n.global.locale == 'ru' ? 'uz' : 'ru';
	localStorage.setItem('lang', i18n.global.locale);
};
const navigateToCourses = () => !route.path.includes('/learn') && router.push('/learn');

/* Computed Values */
const totalNotifications = computed(() =>
	appStore.notifications
		? appStore.notifications.filter(not => not).length > 9
			? '9+'
			: appStore.notifications.filter(not => not).length
		: 0
);
const sidebarStyle = computed(() => ({
	transform: appStore.showPreloader ? 'translateX(-40%)' : 'translateX(0)',
	background: appStore.isDark ? '#1A1A1A' : '#F7F7F7',
}));
const darkSearch = computed(() => ({
	background: appStore.isDark ? '#000' : '#fff',
}));
const darkInput = computed(() => ({
	color: appStore.isDark ? '#fff' : '#000',
	backgroundColor: appStore.isDark ? '#000' : '#fff',
}));
const linkActive = computed(() => (appStore.isDark ? 'link--active--black' : 'link--active'));
</script>

<style lang="scss" scoped>
.darkmode {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	align-items: center;
}
label {
	&.darkmode__label {
		background: rgb(124, 202, 250);

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
	&.lang__label {
		display: flex;
		justify-content: space-between;
		padding-right: 0.6rem;
		padding-left: 0.6rem;
		& svg {
			width: 2.4rem;
			height: 2.4rem;
			transition: all 0.6s;
			&:first-child {
				transform: scale(0.7) translateX(6px);
			}
		}
	}
	width: 8rem;
	height: 3rem;
	position: relative;
	display: block;
	padding: 0.3rem;
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
}
input[type='checkbox'] {
	display: none;
	width: 0;
	height: 0;
	visibility: hidden;
}
#darkmode-toggle {
	&:checked + label.darkmode__label {
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
#lang-toggle {
	&:checked + div label.lang__label {
		&::after {
			left: 7.4rem;
			transform: translateX(-100%);
		}
		& svg:first-child {
			transform: scale(1);
		}
		& svg:last-child {
			transform: scale(0.7) translateX(-6px);
		}
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
	width: 30rem;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 1.3rem;
	transition: all 0.5s ease;
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
		& img {
			width: 2.4rem;
			height: 2.4rem;
			@media only screen and (max-height: 700px) {
				width: 2rem;
				height: 2rem;
			}
		}
	}
	&__search {
		display: flex;
		width: 19rem;
		padding: 0.8rem;
		margin-bottom: 1rem;
		align-items: center;
		gap: 2.4rem;
		border-radius: 1rem;
		@media only screen and (max-height: 570px) {
			padding: 0.5rem 0.8rem;
			margin-bottom: 0;
		}
		& svg {
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
		& input {
			width: 50%;
			border: none;
			font-family: var(--font-base);
			font-size: 1.6rem;
			font-weight: 400;
			border-radius: 1.6rem;
			@media only screen and (max-height: 650px) {
				font-size: 1.3rem;
			}
			&::placeholder {
				opacity: 1;
			}
			&:focus {
				outline: none;
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
		margin-left: 6.3rem;
		padding-right: 1rem;
		@media only screen and (max-width: 1450px) {
			margin-left: 3.7rem;
		}
		@media only screen and (max-height: 530px) {
			margin-left: 0;
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
	&__link {
		color: currentColor;
		text-transform: capitalize;
		transition: all 0.5s ease;
		width: 19rem;
		padding: 0.6rem 0.8rem;
		display: flex;
		align-items: center;
		@media only screen and (max-height: 700px) {
			padding: 0.5rem 0.8rem;
		}
		@media only screen and (max-height: 530px) {
			width: 45%;
		}
		&:hover {
			transform: translateX(1.5rem);
		}
		& svg {
			width: 2.4rem;
			height: 2.4rem;
			margin-right: 2.4rem;
		}
	}
	&__pointer {
		right: 0;
		content: '';
		position: absolute;
		display: inline-block;
		width: 0.8rem;
		height: 3.6rem;
		flex-shrink: 0;
		border-radius: 0.4rem;
		background: var(--brand-solid-secondary-green, #4db1b1);
	}
	&__lang {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 1rem;
	}
}
.link__oval {
	margin-left: 1.2rem;
	display: flex;
	width: 2.4rem;
	height: 2.4rem;
	padding: 0.4rem;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	border-radius: 100rem;
	background: var(--brand-solid-secondary-green, #4db1b1);

	color: #fff;
	font-size: 1rem;
	font-weight: 400;
	text-transform: capitalize;
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
