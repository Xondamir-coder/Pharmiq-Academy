<template>
	<section class="pharmacy" :style="appear">
		<h1>Аптека</h1>

		<h2>Название</h2>
		<div class="pharmacy__box--1 pharmacy__box">
			<div class="pharmacy__text--wrapper">{{ companyName }}</div>
			<div class="pharmacy__box--edit">
				<Pen />
				<span>Редактировать</span>
			</div>
		</div>

		<h2>Адрес</h2>
		<div class="pharmacy__box--2 pharmacy__box">
			<div class="pharmacy__box--2_left">
				<div>
					<h3>Регион</h3>
					<div class="pharmacy__text--wrapper">Ташкент</div>
				</div>
				<div>
					<h3>Район</h3>
					<div class="pharmacy__text--wrapper">Шайхонтохур</div>
				</div>
				<div>
					<h3>Улица</h3>
					<div class="pharmacy__text--wrapper">Чорсу</div>
				</div>
				<div>
					<h3>Дом</h3>
					<div class="pharmacy__text--wrapper">13</div>
				</div>
			</div>

			<div class="pharmacy__box--2_right">
				<div class="pharmacy__box--edit" style="align-self: flex-end">
					<Pen />
					<span>Редактировать</span>
				</div>
				<div class="pharmacy__box--map">
					<span>Локация на карте</span>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191918.02473756118!2d69.19851462144601!3d41.271450848556306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1690558551188!5m2!1sen!2s"
						width="360"
						height="240"
						style="border: 0"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					>
					</iframe>
					<a href="https://goo.gl/maps/rFE9gtS1HYUg3S3CA">
						<FindMe />
					</a>
				</div>
			</div>
		</div>

		<h2>Передача прав на компанию</h2>
		<div class="pharmacy__box--3 pharmacy__box">
			<p>Выберите нового владельца компании</p>
			<div class="pharmacy__box--3_form">
				<div class="pharmacy__box--3__dropdown">
					<p>Выберите сотрудника</p>
					<ArrowDown />
				</div>
				<button class="pharmacy__box--button">ПОКИНУТЬ КОМПАНИЮ</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Pen, FindMe, ArrowDown } from '../assets/icons';
import useAppear from '../composables/useAppear';
import { useAppStore } from '../appStore';

const show = ref(false);
const appStore = useAppStore();

const appear = computed(() => ({
	transform: show.value ? 'scale(1)' : 'scale(0.3)',
}));
const companyName = computed(() => appStore.company.companyName);

onMounted(() => useAppear(show));
</script>

<style lang="scss" scoped>
h2 {
	font-size: 2rem;
	font-weight: 400;
}
h3 {
	font-size: 1.4rem;
	font-weight: 400;
}
.pharmacy {
	transition: all 0.6s;
	height: 100%;
	padding: 3rem 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	@media only screen and (max-height: 600px) {
		align-items: center;
	}
	&__box {
		border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
		background-color: #fff;
		width: 80rem;
		padding: 1rem 3rem;

		&--1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 8rem;
		}
		&--2 {
			height: 33.2rem;
			display: flex;
			gap: 20rem;

			&_left {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			&_right {
				height: 100%;
				display: flex;
				gap: 3.7rem;
				flex-direction: column;
				& a {
					position: absolute;
					right: 4rem;
					bottom: 2rem;
				}
			}
			& iframe {
				border-radius: 3rem;
				@media only screen and (max-height: 700px) {
					width: 287px;
					height: 188px;
				}
				@media only screen and (max-height: 600px) {
					width: 230px;
					height: 149px;
				}
			}
		}
		&--3 {
			padding-bottom: 2rem;
			color: #595959;
			font-size: 1.5rem;
			font-weight: 400;
			display: flex;
			flex-direction: column;
			@media screen and (max-height: 740px) {
				flex-direction: row;
				align-items: center;
			}
			gap: 3rem;
			&_form {
				display: flex;
				align-items: center;
				gap: 3rem;
			}
			&__dropdown {
				position: relative;
				cursor: pointer;
				display: flex;
				width: 36rem;
				height: 5.2rem;
				padding: 1.6rem 1rem;
				justify-content: space-between;
				align-items: center;
				border-radius: 0.8rem;
				border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
				color: #4f4f59;
				font-size: 1.2rem;
				font-weight: 400;
			}
			&__people {
				transition: all 0.3s;
				text-align: center;
				position: absolute;
				transform: translate(100%, -60%);
				width: 36rem;
				@media screen and (max-height: 740px) {
					transform: translate(0, -300%);
				}
				& p {
					font-size: 1.2rem;
					cursor: pointer;
					padding: 0.7rem;
					display: block;
					margin-bottom: 1rem;
					border-radius: 5rem;
					border: 1px solid var(--color-primary);
					&:hover {
						color: var(--color-primary);
					}
				}
			}
			& button {
				padding: 1.6rem 2rem;
				border-radius: 0.8rem;
				background: linear-gradient(136deg, #ff736e 51.56%, #f0b4aa 100%);
				color: #fff;
				text-align: center;
				font-family: var(--font-base);
				font-feature-settings: 'clig' off, 'liga' off;
				font-size: 1.4rem;
				font-weight: 600;
				line-height: 130%; /* 1.82rem */
				border: none;
				cursor: pointer;
			}
		}
		&--edit {
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 0.4rem;
			color: var(--brand-solid-text, #2d3232);
			font-size: 0.8rem;
			font-weight: 400;
		}
		&--map {
			position: relative;

			display: flex;
			flex-direction: column;
			font-size: 1.2rem;
			font-weight: 400;
		}
	}
	&__text--wrapper {
		text-align: center;
		border-radius: 0.8rem;
		border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
		background-color: #fff;
		width: 18rem;
		padding: 1.2rem 0rem;
		font-size: 1.6rem;
		font-weight: 400;
	}
	& h1 {
		font-weight: 500;
	}
}
</style>
