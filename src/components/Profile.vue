<template>
	<div class="home__profile">
		<img :src="avatar" alt="avatar" />
		<h1 style="font-weight: 600">Jayden Grayson</h1>
		<p style="font-size: 1.4rem; font-weight: 400; width: 15rem">Фармацевт в Аптеке SPACE LABS</p>
		<div class="home__profile-wallet">
			Кошелек
			<img :src="wallet" alt="wallet" />
		</div>
		<div class="home__profile-budget">
			3000
			<img :src="coin" alt="coin" />
		</div>
		<p style="font-weight: 600">Достижения</p>
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
		<p>У вас есть промокод, введите его здесь</p>
		<input placeholder="PROMOCODE" type="text" name="promocode" id="promocode" />
		<p>Реферальная ссылка</p>
		<p style="font-weight: 400; font-size: 1.2rem">
			Чтобы добавить сотрудников вашей аптеки в систему, отправьте ему эту ссылку
		</p>
		<button style="background: #4b96dc" class="custom__button">
			<a
				style="color: #fff; font-size: 0.8rem"
				href="https://go.pharmiq.uz/register/ref/2659948313928074"
				>https://go.pharmiq.uz/register/ref/2659948313928074</a
			>
			<img :src="link" alt="link" />
		</button>
		<p style="font-size: 1rem; font-weight: 400">По вашей ссылке прошли регистрацию: 0</p>
		<p style="font-weight: 400; font-size: 1.2rem">Реферальная ссылка фармацевта</p>
		<button class="custom__button">
			<a style="color: #fff; font-size: 0.8rem" href="https://go.pharmiq.uz/inviteTo520"
				>https://go.pharmiq.uz/inviteTo520</a
			>
			<img :src="link" alt="link" />
		</button>
		<p style="font-size: 1rem; font-weight: 400">По вашей ссылке прошли регистрацию: 0</p>
	</div>
</template>
<script setup>
import avatar from '../assets/avatar.svg';
import wallet from '../assets/icons/wallet.svg';
import locked from '../assets/icons/award-locked.svg';
import link from '../assets/icons/copy-link.svg';
import coin from '../assets/icons/coin-icon.svg';
setTimeout(() => {
	document.querySelector('.home__profile').style.transform = 'translateX(0)';
}, 3500);
</script>
<style lang="scss" scoped>
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
	gap: 1.4rem;
	width: 34rem;
	padding-top: 1rem;
	height: 88.2rem;
	border-radius: 5rem 0rem 0rem 5rem;
	background: #fff;
	box-shadow: -8px 0px 20px 0px rgba(0, 0, 0, 0.05);
	font-weight: 600;
	text-align: center;
	& input {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25.2rem;
		padding: 1.6rem;
		border-radius: 1rem;
		font-size: 1.6rem;
		border: 1px solid #b3b3b3;
		background: #fff;
		&::placeholder {
			color: #b3b3b3;
			text-align: center;
			font-family: var(--font-base);
			font-size: 1.6rem;
			font-weight: 600;
		}
	}
	&-awards {
		display: inline-flex;
		gap: 3rem;
	}
	&-wallet {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	&-budget {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 2rem;
		height: 3.6rem;
	}
}
</style>
