<template>
	<div class="home__profile" :style="profileStyle">
		<div class="home__profile-edit">
			<h1 :style="headingStyle">Мой профиль</h1>
			<div class="home__profile-edit_button">
				<Pen />
				<p>Редактировать</p>
			</div>
		</div>

		<div class="home__profile-details">
			<Avatar class="home__profile-details__avatar" />
			<h1>{{ userFullName }}</h1>
			<p>{{ appStore.user.role }} в Аптеке SPACE LABS</p>
			<div class="home__profile-budget">
				{{ formattedIqcAmount }}
				<Coin />
			</div>
		</div>

		<div class="home__profile-rewards">
			<h2>Достижения</h2>
			<div class="home__profile-awards">
				<div v-for="award in userAwards" :key="award.id" class="home__profile-awards__container">
					<Award class="home__profile-awards__img" />
					{{ award.name }}
				</div>
			</div>
		</div>

		<form class="home__profile-promocode" @submit.prevent="sendPromocode">
			<h2>У вас есть промокод, введите его здесь</h2>
			<input
				:style="promocodeStyle"
				@input="clearInput"
				placeholder="PROMOCODE"
				type="text"
				v-model="promocode"
			/>
			<span v-if="error">{{ error }}</span>
			<button
				type="submit"
				class="home__profile-promocode__button"
				:disabled="promocode.length < 4"
				:style="disabledButton"
			>
				Проверить
			</button>
		</form>

		<Teleport to="body">
			<div class="overlay" v-if="success"></div>
			<Transition name="fade">
				<div class="popup" v-if="success">
					<div class="popup__content">
						<p>Вы получили</p>
						<h1>{{ success }} <Coin /></h1>
					</div>
					<button @click="closePopup" class="popup__button">OK</button>
				</div>
			</Transition>
		</Teleport>

		<div class="home__profile-links">
			<h2>Реферальная ссылка</h2>
			<p>Чтобы добавить сотрудников вашей аптеки в систему, отправьте им эту ссылку</p>
			<button
				class="custom__button"
				@click="copyToClipboard('https://go.pharmiq.uz/register/ref/2659948313928074')"
			>
				Нажмите на кнопку и ссылка скопируется
				<CopyLink />
			</button>
			<p class="home__profile-links__smallp">
				По вашей ссылке прошли регистрацию: {{ clickedLinks[0] }}
			</p>
			<p>Реферальная ссылка фармацевта</p>
			<button class="custom__button" @click="copyToClipboard('https://go.pharmiq.uz/inviteTo520')">
				Нажмите на кнопку и ссылка скопируется
				<CopyLink />
			</button>
			<p class="home__profile-links__smallp">
				По вашей ссылке прошли регистрацию: {{ clickedLinks[1] }}
			</p>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useAppStore } from '../appStore.js';
import { Pen, CopyLink, Coin, Award } from '../assets/icons';
import Avatar from '../assets/Avatar.vue';

const appStore = useAppStore();
const promocode = ref('');
const error = ref('');
const success = ref('');
const clickedLinks = ref([0, 0]);
const userAwards = [
	{ id: 0, name: 'Name' },
	{ id: 1, name: 'Name' },
	{ id: 2, name: 'Name' },
];

const closePopup = () => {
	success.value = '';
};
const clearInput = () => {
	if (error.value) promocode.value = '';
	error.value = '';
};
const sendPromocode = async () => {
	promocode.value = promocode.value.toUpperCase();
	const token = appStore.token;
	const formData = new FormData();
	const URL = 'http://api.pharmiq.uz/api/v1-1/spa-users/user-promocode';
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	formData.append('promocode', promocode.value);
	formData.append('platform', 'academy');
	formData.append('browser', getBrowser());
	formData.append('device', getDevice());
	formData.append('timeZone', '500');

	if (promocode.value.length < 4 || error.value) return;

	try {
		const { data } = await axios.post(URL, formData, config);
		console.log('Promocode successfully confirmed: ', data);
		success.value = data.message;

		/* Update IQC  */
		const iqcUrl = 'https://api.pharmiq.uz/api/v1-1/mobile-user';
		const { data: userData } = await axios.get(iqcUrl, config);
		appStore.iqc = userData.iqc;
	} catch (err) {
		console.log('Error sending promocode: ', err);
		error.value = err.response.data.message.ru;
		if (err.response.status == 500) error.value = 'Ошибка сервера. Повторите через некоторое время';
	}
};
const copyToClipboard = (link) => {
	const tempInput = document.createElement('input');
	tempInput.value = link;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);

	alert('Ссылка скопирована в буфер обмена!');
	if (link.includes('ref')) clickedLinks.value[0]++;
	else clickedLinks.value[1]++;
};
const getBrowser = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.includes('chrome')) return 'Chrome';
	else if (userAgent.includes('firefox')) return 'Firefox';
	else if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
	else if (userAgent.includes('edge')) return 'Edge';
	else if (userAgent.includes('opr') || userAgent.includes('opera')) return 'Opera';
	else return 'Chrome';
};
const getDevice = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.includes('mobile') || userAgent.includes('android')) return 'Mobile device';
	else if (userAgent.includes('tablet')) return 'Tablet device';
	else return 'Desktop device';
};

const userFullName = computed(() => `${appStore.user.firstName} ${appStore.user.lastName}`);
const formattedIqcAmount = computed(() => (appStore.iqc ? `${appStore.iqc.amountofIQC}` : '3000'));
const profileStyle = computed(() => ({
	transform: appStore.showPreloader ? 'translateX(40%)' : 'translateX(0)',
	zIndex: appStore.showPreloader ? '-1' : '10',
	background: appStore.isDark ? '#000' : '#fff',
	boxShadow: appStore.isDark
		? '-8px 0px 20px 0px rgba(255, 255, 255, 0.10)'
		: '-8px 0px 20px 0px rgba(0, 0, 0, 0.05)',
	color: appStore.isDark ? '#fff' : '#545454',
}));
const headingStyle = computed(() => ({
	color: appStore.isDark ? '#fff' : '#131313',
}));
const promocodeStyle = computed(() => ({
	background: appStore.isDark ? '#000' : '#fff',
	color: error.value ? '#FF736E' : appStore.isDark ? '#fff' : '#000',
	border: error.value ? '1px solid #FF736E' : '1px solid #b3b3b3',
}));
const disabledButton = computed(() => ({
	cursor: promocode.value.length < 4 || error.value ? 'not-allowed' : 'pointer',
	background:
		promocode.value.length < 4 || error.value
			? '#E6F0F0'
			: 'var(--Richard-Gradient, linear-gradient(102deg, #61C1C0 -0.69%, #358184 100%))',
	color: promocode.value.length < 4 || error.value ? '#B3B3B3' : '#fff',
}));
</script>

<style lang="scss" scoped>
p {
	font-size: 1.2rem;
	font-weight: 400;
}
h2 {
	font-size: 1.6rem;
	font-weight: 600;
}
.home__profile {
	@media only screen and (max-width: 1450px) {
		width: 28rem;
		padding: 0.8rem 1rem;
	}
	position: fixed;
	top: 0;
	right: 0;
	transition: all 0.5s ease;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 1.4rem;
	width: 34rem;
	padding: 1.8rem 3rem;
	height: 100vh;
	border-radius: 3rem 0rem 0rem 3rem;
	text-align: center;
	&-edit {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		& p {
			font-size: 1rem;
		}
		& h1 {
			font-weight: 500;
			font-size: 1.6rem;
			font-weight: 500;
		}
		& img {
			width: 1.6rem;
			height: 1.6rem;
		}
		&_button {
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 4px;
			transition: transform 0.5s;
			transform: translateX(8rem);
			&:hover {
				transform: translateX(0);
			}
			&:hover p {
				opacity: 1;
			}
			& svg {
				width: 1.6rem;
				height: 1.6rem;
			}
			& p {
				transition: opacity 0.5s;
				opacity: 0;
			}
		}
	}
	&-details {
		display: grid;
		width: 100%;
		grid-template-columns: 40% 60%;
		align-items: center;
		column-gap: 1rem;
		&__avatar {
			width: 12rem;
			height: 12rem;
			grid-column: 1 / span 1;
			grid-row: 1 / span 3;
		}

		& h1 {
			grid-column: 2 / span 1;
			font-size: 2rem;
		}
		& p {
			grid-column: 2 / span 1;
			grid-row: 2 / span 1;
			font-size: 1.4rem;
			font-weight: 400;
		}
	}
	&-budget {
		grid-column: 2 / span 1;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;
		font-size: 2rem;
		font-weight: 600;

		& svg {
			width: 2.4rem;
			height: 2.4rem;
		}
	}
	&-promocode {
		display: flex;
		flex-direction: column;
		gap: 1vh;
		& span {
			color: var(--brand-solid-primary-pink, #ff736e);
			text-align: center;
			font-size: 1.2rem;
			font-weight: 600;
		}
		&__button {
			margin-top: 0.5rem;
			align-self: center;
			cursor: pointer;
			font-family: var(--font-base);
			color: #fff;
			border: none;
			display: flex;
			width: 20rem;
			padding: 1.2rem 1rem;
			justify-content: center;
			align-items: center;
			gap: 0.8rem;
			border-radius: 1rem;
			background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
			font-size: 1.2rem;
			font-weight: 600;
		}
	}

	& input {
		display: flex;
		width: 100%;
		padding: 1.6rem;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		background: #fff;
		font-family: var(--font-base);
		font-size: 1.6rem;
		font-weight: 600;

		&::placeholder {
			color: #b3b3b3;
			text-align: center;
			font-family: var(--font-base);
			font-size: 1.6rem;
			font-weight: 600;
		}
		&:focus {
			outline: none;
			border: none;
		}
	}
	&-rewards {
		display: flex;
		flex-direction: column;
		gap: 1vh;
	}
	&-awards {
		width: 100%;
		display: inline-flex;
		gap: 3rem;
		font-size: 1.2rem;
		font-weight: 500;
		@media only screen and (max-height: 600px) {
			gap: 1.5rem;
		}
		&__img {
			width: 6.4rem;
			height: 6.4rem;

			@media screen and (max-height: 460px) {
				width: 5rem;
				height: 5rem;
			}
		}
		&__container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	&-links {
		display: flex;
		flex-direction: column;
		gap: 1.5vh;
		& button {
			width: 100%;
			border-radius: 1rem;
			padding: 1rem;
			color: #fff;
			text-align: center;
			font-size: 0.9rem;
			font-weight: 400;
			&:nth-child(3) {
				background: var(--color-secondary);
			}
			& svg {
				width: 2.4rem;
				height: 2.4rem;
			}
		}
		&__img {
			width: 2.4rem;
			height: 2.4rem;
		}
		&__smallp {
			font-size: 1rem;
		}
	}
}
.popup {
	z-index: 2001;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(1);
	display: flex;
	width: 32rem;
	height: 18rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1.6rem;
	border-radius: 1.6rem;
	background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	&__button {
		border: none;
		cursor: pointer;
		display: flex;
		width: 20rem;
		padding: 1rem;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;
		border-radius: 1rem;
		background: #fff;

		color: #4db1b1;
		font-family: var(--font-base);
		font-size: 1.2rem;
		font-weight: 600;
	}
	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		& p {
			color: #fff;
			text-align: center;
			font-size: 2rem;
			font-weight: 600;
		}
		& h1 {
			color: #fff;
			font-size: 3.2rem;
			font-weight: 600;

			display: flex;
			align-items: center;
			gap: 8px;
		}
	}
}
.overlay {
	z-index: 2000;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
}
.fade-leave-active,
.fade-enter-active {
	transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	transform: translate(-50%, -50%) scale(0.5);
	opacity: 0;
}
</style>
