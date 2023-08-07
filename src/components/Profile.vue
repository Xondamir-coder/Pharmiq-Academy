<template>
	<div class="home__profile">
		<div class="home__profile-edit">
			<h1>Мой профиль</h1>
			<div @mouseout="hideEdit" @mouseover="revealEdit" class="home__profile-edit_button">
				<img :src="pen" alt="pen" />
				<p style="font-size: 1rem">Редактировать</p>
			</div>
		</div>

		<div class="home__profile-details">
			<img :src="avatar" alt="avatar" />
			<h1>{{ user.firstName }} {{ user.lastName }}</h1>
			<p>{{ user.role }} в Аптеке SPACE LABS</p>
			<div v-if="iqc" class="home__profile-budget">
				{{ iqc }}
				<img :src="coin" alt="coin" />
			</div>
			<div v-else class="home__profile-budget">
				3000
				<img :src="coin" alt="coin" />
			</div>
		</div>

		<div class="home__profile-rewards">
			<h2>Достижения</h2>
			<div class="home__profile-awards">
				<div style="display: flex; flex-direction: column; align-items: center">
					<img :src="locked" alt="locked" />Name
				</div>
				<div style="display: flex; flex-direction: column; align-items: center">
					<img :src="locked" alt="locked" />Name
				</div>
				<div style="display: flex; flex-direction: column; align-items: center">
					<img :src="locked" alt="locked" />Name
				</div>
			</div>
		</div>

		<div class="home__profile-promocode">
			<h2>У вас есть промокод, введите его здесь</h2>
			<input placeholder="PROMOCODE" type="text" name="promocode" id="promocode" />
		</div>

		<div class="home__profile-links">
			<h2>Реферальная ссылка</h2>
			<p>Чтобы добавить сотрудников вашей аптеки в систему, отправьте ему эту ссылку</p>
			<button @click="copyToClipboard" style="background: #4b96dc" class="custom__button">
				<a href="https://go.pharmiq.uz/register/ref/2659948313928074"
					>Нажмите на кнопку и ссылка скопируется</a
				>
				Нажмите на кнопку и ссылка скопируется
				<img :src="link" alt="link" />
			</button>
			<p style="font-size: 1rem">По вашей ссылке прошли регистрацию: 0</p>
			<p>Реферальная ссылка фармацевта</p>
			<button @click="copyToClipboard" class="custom__button">
				<a href="https://go.pharmiq.uz/inviteTo520">Нажмите на кнопку и ссылка скопируется</a>
				Нажмите на кнопку и ссылка скопируется
				<img :src="link" alt="link" />
			</button>
			<p style="font-size: 1rem">По вашей ссылке прошли регистрацию: 0</p>
		</div>
	</div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import avatar from '../assets/avatar.svg';
import locked from '../assets/icons/award-locked.svg';
import link from '../assets/icons/copy-link.svg';
import coin from '../assets/icons/coin-icon.svg';
import pen from '../assets/icons/pen.svg';

const user = ref({});
const iqc = ref(0);

function copyToClipboard() {
	const linkElement = document.querySelector('.custom__button a');
	const link = linkElement.getAttribute('href');

	// Create a temporary input element to copy the link to the clipboard
	const tempInput = document.createElement('input');
	tempInput.value = link;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);

	alert('Ссылка скопирована в буфер обмена!');
}
const revealEdit = () => {
	const editContainer = document.querySelector('.home__profile-edit_button');
	editContainer.style.transform = 'translateX(0)';
	editContainer.querySelector('p').style.opacity = '1';
};
const hideEdit = () => {
	const editContainer = document.querySelector('.home__profile-edit_button');
	editContainer.style.transform = 'translateX(8rem)';
	editContainer.querySelector('p').style.opacity = '0';
};

/* Fetch Data */
const url = 'https://api.pharmiq.uz/api/v1-1/mobile-user';
const apiKey = '10638|kw7JpzOBtw1Hig3w2bkCEsboQxS8FT9XDK4UcPbB';
const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: `Bearer ${apiKey}`,
};
const fetchData = async () => {
	try {
		const response = await axios.get(url, { headers });
		const data = response.data;
		// iqc.value = data.iqc.amountofIQC;
		user.value = data.user;
	} catch (error) {
		console.error('Error:', error.message);
	}
};

onMounted(() => {
	fetchData();
	setTimeout(() => {
		document.querySelector('.home__profile').style.transform = 'translateX(0)';
	}, 3500);
});
</script>
<style lang="scss" scoped>
p {
	color: #545454;
	font-size: 1.2rem;
	font-weight: 400;
}
h2 {
	color: #545454;
	font-size: 1.6rem;
	font-weight: 600;
}
.home__profile {
	position: fixed;
	top: 0;
	right: 0;
	transform: translateX(40%);
	transition: all 0.5s ease;
	z-index: -1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 1.4rem;
	width: 34rem;
	padding: 1.8rem 3rem;
	height: 100vh;
	border-radius: 3rem 0rem 0rem 3rem;
	background-color: #fff;
	box-shadow: -8px 0px 20px 0px rgba(0, 0, 0, 0.05);
	text-align: center;
	&-edit {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		& h1 {
			color: #131313;
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
		& img:first-child {
			width: 12rem;
			height: 12rem;
			grid-column: 1 / span 1;
			grid-row: 1 / span 3;
		}
		& h1 {
			grid-column: 2 / span 1;
			color: #545454;
			font-size: 2rem;
		}
		& p {
			grid-column: 2 / span 1;
			grid-row: 2 / span 1;
			color: #545454;
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
		color: var(--color-primary);
		font-size: 2rem;
		font-weight: 600;

		& img {
			width: 2.4rem !important;
			height: 2.4rem !important;
		}
	}
	&-promocode {
		display: flex;
		flex-direction: column;
		gap: 1vh;
	}

	& input {
		display: flex;
		width: 100%;
		padding: 1.6rem;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		border: 1px solid #b3b3b3;
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
		color: #545454;
		font-size: 1.2rem;
		font-weight: 500;
		@media only screen and (max-height: 600px) {
			gap: 1.5rem;
		}
		& img {
			width: 6.4rem;
			height: 6.4rem;

			@media screen and (max-height: 460px) {
				width: 5rem;
				height: 5rem;
			}
		}
	}
	&-links {
		display: flex;
		flex-direction: column;
		gap: 1.5vh;
	}
	& button {
		width: 100%;
		border-radius: 1rem;
		padding: 1rem;
		color: #fff;
		text-align: center;
		font-size: 0.8rem;
		font-weight: 400;
		& img {
			width: 2.4rem;
			height: 2.4rem;
		}
		& a {
			display: none;
		}
	}
}
</style>
