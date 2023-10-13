<template>
	<div class="home__profile" :style="profileStyle">
		<div class="home__profile-edit" v-if="!isEditingName">
			<h1 :style="headingStyle">Мой профиль</h1>
			<div class="home__profile-edit_button" @click="editName">
				<Pen />
				<p>Редактировать</p>
			</div>
		</div>

		<div class="home__profile-details" v-if="!isEditingName">
			<Avatar class="home__profile-details__avatar" />
			<h1>{{ userFullName }}</h1>

			<p>{{ appStore.user.role }} в Аптеке SPACE LABS</p>
			<div class="home__profile-budget">
				{{ formattedIqcAmount }}
				<Coin />
			</div>
		</div>
		<Transition name="slide">
			<form class="profile__form" @submit.prevent="updateProfile" v-if="isEditingName">
				<span :style="opacityto1" @click="closeEditing">&times;</span>
				<input
					:style="textColor"
					placeholder="Введите новое имя"
					type="text"
					v-model="newUser.firstName"
					@input="closeEditError"
				/>
				<input
					:style="textColor"
					placeholder="Введите новую фамилию"
					type="text"
					v-model="newUser.lastName"
					@input="closeEditError"
				/>
				<div class="profile__buttons">
					<div class="profile__button--active" :style="genderButton"></div>
					<button
						type="button"
						class="profile__button"
						:style="{ color: btn.data == newUser.gender ? '#fff' : '' }"
						@click="toggleGender(btn.data)"
						v-for="btn in [
							{ label: 'Женщина', data: 1 },
							{ label: 'Мужчина', data: 0 },
						]"
					>
						{{ btn.label }}
					</button>
				</div>
				<label for="date">Введите новую дату рождения</label>
				<input type="date" name="date" v-model="newUser.birthDate" :style="textColor" />
				<p v-if="isEditingError">Пожалуйста, заполните все поля.</p>
				<button class="custom__button" type="submit">OK</button>
			</form>
		</Transition>

		<div class="home__profile-rewards" v-if="!isEditingName">
			<h2>Достижения</h2>
			<div class="home__profile-awards">
				<div v-for="award in userAwards" :key="award.id" class="home__profile-awards__container">
					<Award class="home__profile-awards__img" />
					{{ award.name }}
				</div>
			</div>
		</div>

		<form class="home__profile-promocode" @submit.prevent="sendPromocode" v-if="!isEditingName">
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

		<div class="home__profile-links" v-if="!isEditingName">
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
				По вашей ссылке прошли регистрацию:
				{{ referralLinks[0] }}
			</p>
			<p>Реферальная ссылка фармацевта</p>
			<button class="custom__button" @click="copyToClipboard('https://go.pharmiq.uz/inviteTo520')">
				Нажмите на кнопку и ссылка скопируется
				<CopyLink />
			</button>
			<p class="home__profile-links__smallp">
				По вашей ссылке прошли регистрацию:
				{{ referralLinks[1] }}
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
import { getFormData } from '../composables/useFormData';
import { textColor } from '../composables/useColor';

const appStore = useAppStore();
const isEditingName = ref(false);
const isEditingError = ref(false);
const referralLinks = computed(() => [
	computed(() => appStore.transactions.iqcTransactionsReferralCompany).value,
	computed(() => appStore.transactions.iqcTransactionsReferral).value,
]);
const newUser = ref({
	firstName: '',
	lastName: '',
	birthDate: '',
	gender: 1,
});
const promocode = ref('');
const error = ref('');
const success = ref('');
const userAwards = [
	{ id: 0, name: 'Name' },
	{ id: 1, name: 'Name' },
	{ id: 2, name: 'Name' },
];

const updateProfile = () => {
	if (!newUser.value.firstName || !newUser.value.lastName) {
		isEditingError.value = true;
		return;
	}
	/* Format a date before submitting */
	dateFormatter();
	appStore.updateProfile(newUser.value);
	isEditingName.value = false;
};
const closeEditError = () => (isEditingError.value = false);
const editName = () => {
	isEditingName.value = true;
	newUser.value.birthDate = appStore.user.birthDate;
	newUser.value.gender = appStore.user.gender;
};
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
	const URL = 'https://api.pharmiq.uz/api/v1-1/spa-users/user-promocode';
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const formData = getFormData();
	formData.append('promocode', promocode.value);

	if (promocode.value.length < 4 || error.value) return;

	try {
		const { data } = await axios.post(URL, formData, config);
		console.log('Promocode successfully confirmed: ', data);
		success.value = data.message;

		/* Update IQC */
		appStore.getIqc();
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
const dateFormatter = () => {
	const inputDateValue = newUser.value.birthDate;
	const inputDateParts = inputDateValue.split('-'); // Split by hyphens (YYYY-MM-DD)

	if (inputDateParts.length === 3) {
		const year = parseInt(inputDateParts[0]);
		const month = parseInt(inputDateParts[1]);
		const day = parseInt(inputDateParts[2]);

		if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
			const inputDate = new Date(year, month - 1, day); // Month is zero-based
			const formattedDate = inputDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
			newUser.value.birthDate = formattedDate;
		}
	}
};
const toggleGender = (newGender) => (newUser.value.gender = newGender);
const closeEditing = () => (isEditingName.value = false);

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
const genderButton = computed(() => ({
	transform: newUser.value.gender == 1 ? 'translateX(0)' : 'translateX(100%)',
	background: newUser.value.gender == 0 ? '' : 'var(--color-primary-pink)',
}));
const opacityto1 = computed(() => ({
	opacity: isEditingName.value ? '1' : '0',
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
.profile {
	&__form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		& span {
			transition: all 0.4s 0.4s;
			cursor: pointer;
			font-size: 4rem;
			color: var(--color-primary);
			position: absolute;
			top: 2rem;
			right: 2rem;
		}
		& input {
			background-color: transparent;
			font-size: 1.6rem;
			font-family: var(--font-base);
			border-radius: 1rem;
			border: 1px solid var(--color-primary);
			padding: 1rem;
			&:focus {
				outline-color: var(--color-primary);
				outline-style: solid;
			}
		}
		& p {
			color: red;
		}
		& button {
			width: auto;
		}
	}
	&__buttons {
		position: relative;
		display: flex;
		padding-right: 0px;
		align-items: center;
		gap: 1rem;

		border-radius: 3rem;
		border: 1px solid #b8b8d2;
	}
	&__button {
		transition: color 0.3s 0.2s;
		height: 5.2rem;
		width: 50% !important;
		border: none;
		color: #858597;
		font-size: 1.2rem;
		font-weight: 600;
		border-radius: 3rem;
		background-color: transparent;
		&--active {
			transition: transform 0.5s, background 0.6s;
			z-index: -2;
			width: 50%;
			height: 5.2rem;
			top: 0;
			position: absolute;
			border-radius: 3rem;
			background: linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%);
			box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25);
		}
	}
}
.slide-leave-active,
.slide-enter-active {
	transition: all 0.5s;
}
.slide-enter-from {
	transform: translateY(-50vh);
	opacity: 0;
}
.slide-leave-to {
	display: none;
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
