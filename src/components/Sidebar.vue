<template>
	<div class="sidebar" :style="sidebarStyle">
		<a href="/"><Logo class="sidebar__logo" /></a>

		<div class="sidebar__search" :style="darkSearch">
			<Search />
			<input type="text" placeholder="Поиск" :style="darkInput" />
		</div>

		<!-- <div class="sidebar__pointer" :style="pointerStyle"></div> -->
		<nav class="sidebar__nav">
			<RouterLink
				class="sidebar__link"
				v-for="(link, index) in navLinks"
				:key="index"
				:to="link.to"
				:active-class="linkActive"
				:style="textColor"
			>
				<component :is="link.icon"></component>
				{{ link.label }}
			</RouterLink>
			<input type="checkbox" name="darkmode-toggle" id="darkmode-toggle" />
			<label for="darkmode-toggle" @click="toggleDarkMode">
				<Sun class="sun" />
				<Moon class="moon" />
			</label>
		</nav>

		<p :style="textColor">Скачивайте наше мобильное приложение</p>
		<img class="sidebar__qrcode" src="../assets/qr-code.webp" alt="qr code" />
		<a href="javascript:void(0);" class="sidebar__link" :style="textColor"><Logout /> выход</a>
	</div>
</template>
<script setup>
import { ref, computed, shallowRef } from 'vue';
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
	Settings,
	Logout,
	Sun,
	Moon,
} from '../assets/icons';
import { textColor } from '../composables/useColor';

const appStore = useAppStore();
// const curPosition = ref(16.6);

const navLinks = ref([
	{ label: 'Главная', to: '/', icon: shallowRef(Home) },
	{ label: 'Обучение', to: '/learn', icon: shallowRef(Learn) },
	{ label: 'статистика', to: '/statistics', icon: shallowRef(Statistics) },
	{ label: 'аптека', to: '/pharmacy', icon: shallowRef(Pharmacy) },
	{ label: 'магазин', to: '/store', icon: shallowRef(Store) },
	{ label: 'письма', to: '/mailbox', icon: shallowRef(Mailbox) },
	{ label: 'настройки', to: '/settings', icon: shallowRef(Settings) },
]);
const toggleDarkMode = () => {
	appStore.isDark = !appStore.isDark;
};
// const setPointer = (index) => {
// 	console.log(index);
// };
/* Computed Values */
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
const linkActive = computed(() => {
	if (appStore.isDark) return 'link--active--black';
	return 'link--active';
});
const pointerStyle = computed(() => ({
	top: `${curPosition.value}%`,
}));
</script>

<style lang="scss" scoped>
label {
	margin-bottom: 1rem;
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
		margin-left: 6.7rem;
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
		text-transform: capitalize;
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
		& svg {
			width: 2.4rem;
			height: 2.4rem;
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
