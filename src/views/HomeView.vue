<template>
	<section class="home">
		<div>
			<h1 style="font-weight: 600" class="home__username">С возрашением, Джейден!</h1>
			<p class="home__date">07 Августа, 2023</p>
		</div>

		<div class="home__slider">
			<Slide v-for="slide in slides" :key="slide.id" :props="slide" />
		</div>
		<div class="home__course">
			<div class="home__course-bg">
				<img :src="books" alt="Books" />
				<p>Базовый курс по PharmIQ</p>
			</div>
			<p class="home__course-category">Категория</p>
			<h2>КУРС: НАЗВАНИЕ КУРСА</h2>
			<div class="home__course-info">
				<img :src="play" alt="play" />
				<p>1 видеоурок</p>
				<h1>15 минут</h1>
			</div>
			<div class="home__course-info__bar"></div>
			<button class="custom__button">
				ПРОЙТИ КУРС И ПОЛУЧИТЬ 200
				<img :src="coin" alt="Money" />
			</button>
		</div>
		<div class="home__leaders">
			<h1>Таблица лидеров</h1>
			<div class="home__leaders-grid">
				<p class="home__leaders-grid_title">Место</p>
				<p class="home__leaders-grid_title">Фамилия Имя</p>
				<p class="home__leaders-grid_title">Аптека</p>
				<p class="home__leaders-grid_title">Показатель обучения</p>
				<p class="home__leaders-grid_detail">1</p>
				<p class="home__leaders-grid_detail">Калинина О.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">34235 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">2</p>
				<p class="home__leaders-grid_detail">Романовский Р.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">29235 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">3</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">29035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">4</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">28035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">5</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">27035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">6</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">26035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">7</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">25035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">8</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">24035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">9</p>
				<p class="home__leaders-grid_detail">Дауров Т.</p>
				<p class="home__leaders-grid_detail">Tabletka # 32</p>
				<p class="home__leaders-grid_detail">20035 <img :src="coin" alt="coin" /></p>
				<p class="home__leaders-grid_detail">.................</p>
				<p class="home__leaders-grid_detail">.......................................</p>
				<p class="home__leaders-grid_detail">.......................................</p>
				<p class="home__leaders-grid_detail">.......................................</p>
				<div class="home__leaders-grid_last">
					<p>101</p>
					<p>Очкин Р.</p>
					<p>PIQ</p>
					<p style="color: #fff" class="home__leaders-grid_detail">
						2350 <img :src="coin" alt="coin" />
					</p>
				</div>
			</div>
		</div>
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
	</section>
</template>

<script setup>
import books from '../assets/books.png';
import play from '../assets/icons/play.svg';
import coin from '../assets/icons/coin-icon.svg';
import wallet from '../assets/icons/wallet.svg';
import locked from '../assets/icons/award-locked.svg';
import link from '../assets/icons/copy-link.svg';
import avatar from '../assets/avatar.svg';
import Slide from '../components/Home/Slide.vue';
import slides from '../data/slide.json';
</script>

<style lang="scss" scoped>
.home {
	position: relative;
	height: 100%;
	width: 100%;
	padding: 3.6rem;
	display: grid;
	grid-template-columns: 32rem 42rem 1fr;
	row-gap: 5rem;
	column-gap: 3rem;
	grid-template-rows: repeat(3, max-content);
	&__profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.7rem;
		width: 34rem;
		padding-top: 2rem;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
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
	&__leaders {
		grid-column: 2 / span 1;
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
		height: 36.2rem;
		&-grid {
			display: grid;
			grid-template-columns: repeat(4, max-content);
			column-gap: 3rem;
			row-gap: 1.5rem;
			align-items: center;
			justify-items: center;
			&_last {
				grid-column: 1/-1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0.4rem 1.4rem;
				border-radius: 0.4rem;
				background: var(--richard-gradient, linear-gradient(136deg, #61c1c0 0%, #358184 100%));
				& > * {
					color: #fff;
					font-size: 1rem;
					font-weight: 500;
				}
			}
			&_title {
				color: #358184;
				font-size: 1.1rem;
				font-weight: 700;
			}
			&_detail {
				display: flex;
				align-items: center;
				color: #858597;
				gap: 0.4rem;
				font-size: 1.3rem;
				font-weight: 500;
			}
			& img {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
		& h1 {
			font-weight: 400;
			font-size: 2rem;
		}
	}
	&__slider {
		grid-column: 1/-1;
		display: flex;
		flex-wrap: nowrap;
		width: 86rem;
		padding-right: 2rem;
		overflow-x: auto;
		gap: 3rem;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	&__date {
		grid-row: 2 / span 1;
		color: #808080;
		margin-top: 1rem;
		font-size: 2rem;
	}
	&__course {
		grid-column: 1 / span 1;
		width: 32rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		&-bg {
			border-radius: 3rem;
			background: linear-gradient(136deg, #61c1c0 0%, #358184 100%);
			width: 32rem;
			height: 18rem;
			display: flex;
			margin-bottom: 5rem;
			& img {
				width: 19.8rem;
				height: 21.5rem;
			}
			& p {
				margin-top: 6rem;
				width: 10.6rem;
				color: #fff;
				font-weight: 700;
			}
		}
		&-info {
			display: flex;
			gap: 0.52rem;
			align-items: center;
			color: #61c1c0;
			font-size: 1.2rem;
			font-weight: 500;
			& h1 {
				font-size: 2rem;
				font-weight: 700;
				margin-left: auto;
			}
			&__bar {
				width: 100%;
				height: 0.7rem;
				border-radius: 0.5rem;
				border: 1px solid #61c1c0;
				background: #effffe;
				&::before {
					content: '';
					display: block;
					width: 60%;
					height: 100%;
					border-radius: 0.5rem;
					background-color: #61c1c0;
				}
			}
		}
		& h2 {
			color: #358184;
			font-size: 1.5rem;
			font-weight: 600;
		}
		&-category {
			color: #61c1c0;
			font-size: 1rem;
			font-weight: 500;
			line-height: 150%;
		}
	}
}
</style>
