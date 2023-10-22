<template>
	<div class="home__profile" :style="profileStyle">
		<div class="home__profile-update" v-if="isEditing">
			<div class="home__profile-edit">
				<h1 :style="headingStyle">Изменить профиль</h1>
				<div class="home__profile-edit_button" @click="toggleEdit">
					<Pen />
					<p>Редактировать</p>
				</div>
			</div>

			<img :src="dynamicAvatar" alt="avatar" class="home__profile-update_avatar" />

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

			<div class="home__profile-update_input">
				<label for="name">Имя</label>
				<input type="text" id="name" v-model="newUser.firstName" @input="checkInput" />
				<label v-if="editingError == 'fname' || editingError == 'name'" for="name">
					Введите имя
				</label>
			</div>

			<div class="home__profile-update_input">
				<label for="lastname">Фамилия</label>
				<input type="text" id="lastname" v-model="newUser.lastName" @input="checkInput" />
				<label v-if="editingError == 'lname' || editingError == 'name'" for="name">
					Введите фамилию
				</label>
			</div>

			<div class="home__profile-update_input">
				<label for="date" :style="dateLabelStyle">Дата рождения</label>
				<input type="date" id="date" v-model="newUser.birthDate" :style="dateInputStyle" />
				<InputOkay v-if="editingError != 'date'" />
				<label v-if="editingError == 'date'">
					{{ !newUser.birthDate ? 'Введите дату рождения' : 'Возраст меньше чем 18' }}
				</label>
			</div>

			<div class="home__profile-update_input">
				<label for="tel" :style="telLabelStyle">Номер телефона</label>
				<input type="tel" id="tel" v-model="newUser.phoneNumber" :step="telInputStyle" />
			</div>

			<button
				class="custom__button"
				:style="saveButtonStyle"
				:disabled="!isOkaySave"
				@click="updateProfile"
			>
				Сохранить <Save :active="isOkaySave" />
			</button>
		</div>

		<div class="home__profile-main" v-else>
			<div class="home__profile-edit">
				<h1 :style="headingStyle">Мой профиль</h1>
				<div class="home__profile-edit_button" @click="toggleEdit">
					<Pen />
					<p>Редактировать</p>
				</div>
			</div>

			<div class="home__profile-details">
				<img :src="avatarSrc" class="home__profile-details__avatar" alt="avatar" />
				<h1>{{ userFullName }}</h1>

				<p>{{ role }} в Аптеке SPACE LABS</p>
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
					<span class="btn-ring" :style="displayBtn"></span>
				</button>
			</form>

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
					По вашей ссылке прошли регистрацию:
					{{ referralLinks[0] }}
				</p>
				<p>Реферальная ссылка фармацевта</p>
				<button
					class="custom__button"
					@click="copyToClipboard('https://go.pharmiq.uz/inviteTo520')"
				>
					Нажмите на кнопку и ссылка скопируется
					<CopyLink />
				</button>
				<p class="home__profile-links__smallp">
					По вашей ссылке прошли регистрацию:
					{{ referralLinks[1] }}
				</p>
			</div>
		</div>
	</div>

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
</template>

<script setup>
import axios from 'axios';
import { computed, ref, reactive } from 'vue';
import { useAppStore } from '../appStore.js';
import { Pen, CopyLink, Coin, Award, Save, InputOkay } from '../assets/icons';
import { getFormData } from '../composables/useFormData';

const appStore = useAppStore();
const newUser = reactive({
	firstName: '',
	lastName: '',
	birthDate: '',
	phoneNumber: '',
	gender: 0,
});
const promocode = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);
const isEditing = ref(false);
const editingError = ref('');
const userAwards = [
	{ id: 0, name: 'Name' },
	{ id: 1, name: 'Name' },
	{ id: 2, name: 'Name' },
];

const updateProfile = () => {
	dateFormatter();
	appStore.updateProfile(newUser);
	toggleEdit();
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
		loading.value = true;
		const { data } = await axios.post(URL, formData, config);
		console.log('Promocode successfully confirmed: ', data);
		success.value = data.message;

		/* Update IQC */
		appStore.getUser();
	} catch (err) {
		console.log('Error sending promocode: ', err);
		error.value = err.response.data.message.ru;
		if (err.response.status == 500) error.value = 'Ошибка сервера. Повторите через некоторое время';
	} finally {
		loading.value = false;
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
	const inputDateValue = newUser.birthDate;
	const inputDateParts = inputDateValue.split('-'); // Split by hyphens (YYYY-MM-DD)

	if (inputDateParts.length === 3) {
		const year = parseInt(inputDateParts[0]);
		const month = parseInt(inputDateParts[1]);
		const day = parseInt(inputDateParts[2]);

		if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
			const inputDate = new Date(year, month - 1, day); // Month is zero-based
			const formattedDate = inputDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
			newUser.birthDate = formattedDate;
		}
	}
};
const checkInput = () => {
	newUser.firstName = newUser.firstName.replace(/[\s\d]/g, '');
	newUser.lastName = newUser.lastName.replace(/[\s\d]/g, '');
};
const toggleGender = (newGender) => (newUser.gender = newGender);
const toggleEdit = () => {
	isEditing.value = !isEditing.value;
	const { firstName, lastName, birthDate, gender } = appStore.user;
	newUser.firstName = firstName;
	newUser.lastName = lastName;
	newUser.birthDate = birthDate;
	newUser.gender = gender;
};
const toggleError = (val) => (editingError.value = val);

const avatarSrc = computed(() => {
	if (appStore.user.role == 'Employee')
		return appStore.user.gender == 1
			? 'src/assets/female-employee.png'
			: 'src/assets/male-employee.png';
	else if (appStore.user.role == 'Owner')
		return appStore.user.gender == 1 ? 'src/assets/female-owner.png' : 'src/assets/male-owner.png';
	else return 'src/assets/creator.png';
});
const dynamicAvatar = computed(() => {
	if (appStore.user.role == 'Employee')
		return newUser.gender == 1 ? 'src/assets/female-employee.png' : 'src/assets/male-employee.png';
	else if (appStore.user.role == 'Owner')
		return newUser.gender == 1 ? 'src/assets/female-owner.png' : 'src/assets/male-owner.png';
	else return 'src/assets/creator.png';
});
const referralLinks = computed(() => [
	computed(() => appStore.transactions.iqcTransactionsReferralCompany).value,
	computed(() => appStore.transactions.iqcTransactionsReferral).value,
]);
const userFullName = computed(() => `${appStore.user.firstName} ${appStore.user.lastName}`);
const role = computed(() =>
	appStore.user.role == 'Employee'
		? 'Фармацевт'
		: appStore.user.role == 'Owner'
		? 'Командир'
		: appStore.user.role
);
const formattedIqcAmount = computed(() => (appStore.iqc ? appStore.iqc.amountofIQC : '0'));
const isOkaySave = computed(() => {
	if (!newUser.firstName && !newUser.lastName) {
		toggleError('name');
		return false;
	} else if (!newUser.firstName) {
		toggleError('fname');
		return false;
	} else if (!newUser.lastName) {
		toggleError('lname');
		return false;
	} else if (2023 - parseInt(newUser.birthDate.slice(0, 4)) < 18 || !newUser.birthDate) {
		toggleError('date');
		return false;
	}
	editingError.value = '';
	return true;
});

const dateLabelStyle = computed(() => ({
	color: editingError.value == 'date' ? 'var(--color-primary-pink)' : '',
}));
const dateInputStyle = computed(() => ({
	color: editingError.value == 'date' ? 'var(--color-primary-pink)' : '',
	borderColor: editingError.value == 'date' ? 'var(--color-primary-pink)' : '',
}));
const telLabelStyle = computed(() => ({
	color: editingError.value == 'tel' ? 'var(--color-primary-pink)' : '',
}));
const telInputStyle = computed(() => ({
	color: editingError.value == 'tel' ? 'var(--color-primary-pink)' : '',
	borderColor: editingError.value == 'tel' ? 'var(--color-primary-pink)' : '',
}));
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
const saveButtonStyle = computed(() => ({
	color: !isOkaySave.value ? '#BBB' : '',
	background: !isOkaySave.value ? '#E6F0F0' : '',
	cursor: !isOkaySave.value ? 'not-allowed' : '',
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
	transform: newUser.gender == 1 ? 'translateX(0)' : 'translateX(100%)',
	background: newUser.gender == 0 ? '' : 'var(--color-primary-pink)',
}));
const displayBtn = computed(() => ({
	display: loading.value ? 'block' : 'none',
}));
</script>

<style lang="scss" scoped>
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
	border-radius: 3rem 0rem 0rem 3rem;
	width: 34rem;
	& > * {
		padding: 1.8rem 3rem;
		border-radius: 3rem 0rem 0rem 3rem;
		text-align: center;
		height: 100vh;
	}
	&-update {
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
		&_avatar {
			align-self: center;
			width: 10rem;
			height: 10rem;
		}
		&_input {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.4rem;
			position: relative;
			& svg {
				position: absolute;
				top: 40%;
				right: 20%;
				width: 3rem;
				height: 3rem;
			}
			& input {
				display: flex;
				width: 28rem;
				padding: 1.2rem 1rem;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 3rem;
				border: 1px solid #b8b8d2;

				font-family: var(--font-base);
				text-align: center;
				font-size: 1.6rem;
				font-weight: 400;
			}
			& label {
				text-align: center;
				font-size: 1.2rem;
				&:first-child {
					color: #858597;
				}
				&:last-child {
					color: var(--color-primary-pink);
				}
			}
		}
		& button {
			& svg {
				width: 2rem;
				height: 2rem;
			}
			transition: all 0.5s;
			width: auto;
			text-transform: uppercase;
		}
	}
	&-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		gap: 1.4rem;
	}
	& p {
		font-size: 1.2rem;
		font-weight: 400;
	}
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
			font-size: 1rem !important;
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
.btn-ring {
	display: none;
	&:after {
		content: '';
		display: block;
		width: 17px;
		height: 17px;
		margin: 8px;
		border-radius: 50%;
		border: 3px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: ring 1.2s linear infinite;
	}
}
@keyframes ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
