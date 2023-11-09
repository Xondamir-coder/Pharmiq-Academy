<template>
	<section class="pharmacy" :style="[appear, textColor]">
		<h1>{{ i18n.global.t('board_pharmacy') }}</h1>

		<h2>{{ i18n.global.t('name') }}</h2>
		<div class="pharmacy__box--1 pharmacy__box">
			<div class="pharmacy__text--wrapper">{{ companyName }}</div>
			<div class="pharmacy__box--edit">
				<Pen />
				<span>{{ i18n.global.t('profile_btn') }}</span>
			</div>
		</div>

		<h2>{{ i18n.global.t('address') }}</h2>
		<div class="pharmacy__box--2 pharmacy__box">
			<div class="pharmacy__box--2_left">
				<div>
					<h3>{{ i18n.global.t('region') }}</h3>
					<div class="pharmacy__text--wrapper">
						{{ city.replace(i18n.global.t('region'), '') }}
					</div>
				</div>
				<div>
					<h3>{{ i18n.global.t('district') }}</h3>
					<div class="pharmacy__text--wrapper">
						{{ district.replace(i18n.global.t('district'), '') }}
					</div>
				</div>
				<div>
					<h3>{{ i18n.global.t('street') }}</h3>
					<div class="pharmacy__text--wrapper">
						{{ street.replace(i18n.global.t('street'), '') }}
					</div>
				</div>
				<div>
					<h3>{{ i18n.global.t('house') }}</h3>
					<div class="pharmacy__text--wrapper">
						{{ house.replace(i18n.global.t('house'), '') }}
					</div>
				</div>
			</div>

			<div class="pharmacy__box--2_right">
				<div class="pharmacy__box--edit" style="align-self: flex-end">
					<Pen />
					<span>{{ i18n.global.t('profile_btn') }}</span>
				</div>
				<div class="pharmacy__box--map">
					<span>Локация на карте</span>
				</div>
			</div>
		</div>

		<h2>{{ i18n.global.t('pharmacy_pass_rights') }}</h2>
		<div class="pharmacy__box--3 pharmacy__box">
			<p>{{ i18n.global.t('pharmacy_choose_owner') }}</p>
			<div class="pharmacy__box--3_form">
				<select
					class="pharmacy__box--3__dropdown"
					v-model="selectedEmployee"
					:style="dropdownStyle">
					<option
						v-for="employee in employees"
						:key="employee.user_id"
						:value="employee.user_id">
						{{ employee.name }}
					</option>
					<option :value="i18n.global.t('pharmacy_choose_employee')" selected disabled>
						{{ i18n.global.t('pharmacy_choose_employee') }}
					</option>
				</select>
				<button class="pharmacy__box--button" @click="changeOwner">
					{{ i18n.global.t('pharmacy_leave') }}
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Pen } from '../assets/icons';
import useAppear from '../composables/useAppear';
import { useAppStore } from '../appStore';
import { textColor } from '../composables/useColor';
import i18n from '../locales';
import axios from 'axios';
import { getFormData } from '../composables/useFormData';

const appStore = useAppStore();
const show = ref(false);
const selectedEmployee = ref(i18n.global.t('pharmacy_choose_employee'));
const employees = ref();
const BASE_URL = 'https://api.pharmiq.uz/api/v1-1/spa-users';
const config = {
	headers: { Authorization: `Bearer 11664|FQYyyD4qnpMbbQWhmY1OJ3gukn3J2GNML7H7MmWP` },
};

const fetchEmployees = async function () {
	const URL = `${BASE_URL}/user-company-members-list`;

	try {
		const { data } = await axios.get(URL, config);
		employees.value = data;
	} catch (error) {
		console.log('Error: ', error);
	}
};
const leaveCompany = async function () {
	const URL = `${BASE_URL}/`;

	try {
		const { data } = await axios.get(URL, formData, config);
		console.log(data);
	} catch (error) {
		console.log('Error: ', error);
	}
};
const changeOwner = async function () {
	const URL = `${BASE_URL}/user-company-members-change`;
	const formData = getFormData();
	formData.append('member_id', selectedEmployee.value);

	try {
		const { data } = await axios.get(URL, formData, config);
		console.log(data);
		leaveCompany();
	} catch (error) {
		console.log('Error: ', error);
	}
};

const appear = computed(() => ({
	transform: show.value ? 'scale(1)' : 'scale(0.3)',
}));
const dropdownStyle = computed(() => ({
	background: appStore.isDark ? '#000' : '#fff',
	color: appStore.isDark ? '#fff' : '#000',
}));
const companyName = computed(() => appStore.company.companyName);
const city = computed(
	() => appStore.company.companyadress.city[`name_${i18n.global.locale}`.toLowerCase()]
);
const district = computed(
	() => appStore.company.companyadress.region[`name_${i18n.global.locale}`.toLowerCase()]
);
const house = computed(() => appStore.company.companyadress.addressline1.slice(-2).toLowerCase());
const street = computed(() =>
	appStore.company.companyadress.addressline1
		.slice(0, appStore.company.companyadress.addressline1.indexOf(house.value))
		.toLowerCase()
		.trim()
		.replace(',', '')
);

onMounted(() => {
	useAppear(show);
	fetchEmployees();
});
</script>

<style lang="scss" scoped>
h2 {
	font-size: 2rem;
	font-weight: 400;
}
h3 {
	font-size: 1.4rem;
	font-weight: 400;
	text-transform: capitalize;
}
.pharmacy {
	transition: all 0.6s;
	height: 100%;
	padding: 1rem 0;
	padding-right: 4rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	&__box {
		border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
		padding: 1rem 3rem;

		&--1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 8rem;
		}
		&--2 {
			display: flex;

			&_left {
				width: 40%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 1rem;
				& div {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}
			}
			&_right {
				height: 100%;
				display: flex;
				flex: 1;
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
			position: relative;
			padding-bottom: 2rem;
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
				background-color: transparent;
				position: relative;
				cursor: pointer;
				display: flex;
				width: 30rem;
				height: 5.2rem;
				padding: 1.6rem 1rem;
				justify-content: space-between;
				align-items: center;
				border-radius: 0.8rem;
				border: 1px solid var(--brand-solid-primary-white, #e6f0f0);
				font-family: var(--font-base);
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
				text-transform: uppercase;
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
