<template>
	<section class="mailbox" :style="textColor">
		<div class="mailbox__head" :style="mailboxHeadStyle">
			<h1>{{ i18n.global.t('mailbox_title') }}</h1>
			<div class="mailbox__check">
				<CheckAll @click="notificationCheckAll" />
				<p>{{ i18n.global.t('mailbox_check') }}</p>
			</div>
		</div>
		<div class="mailbox__content">
			<div
				class="mailbox__item"
				v-for="notification in notifications"
				:key="notification.id"
				:style="[
					mailboxItemStyle,
					{ filter: notification.inbox_log ? 'grayscale(100%)' : '' },
				]"
				@click="showNotification(notification)">
				<div class="mailbox__icon" :style="mailboxIconStyle">
					<img
						:src="notification.messageType == 'Gift' ? 'gift.png' : 'notification.png'"
						alt="icon" />
				</div>

				<div class="mailbox__item--main">
					<div class="mailbox__item--info">
						<h2 class="mailbox__title">
							{{ JSON.parse(notification.titleName)[i18n.global.locale] }}
						</h2>
						<div class="mailbox__item--date">
							<span class="mailbox__span">{{
								notification.startDate.slice(0, 10).replaceAll('-', '.')
							}}</span>
							-
							<span class="mailbox__span">{{
								notification.endDate.slice(0, 10).replaceAll('-', '.')
							}}</span>
						</div>
					</div>
					<p>
						{{
							JSON.parse(notification.descriptionText)[i18n.global.locale].slice(
								0,
								160
							)
						}}...
					</p>
				</div>
			</div>
			<p v-if="isEmpty">{{ i18n.global.t('mailbox_none') }}</p>
		</div>
	</section>

	<Teleport to="body">
		<div class="overlay" @click="showNotification(false)" v-if="popup"></div>
		<Transition name="fade">
			<div class="mailbox__popup" v-if="popup">
				<div class="mailbox__popup--head">
					<div>
						<div class="mailbox__icon">
							<img
								:src="popup.messageType == 'Gift' ? 'gift.png' : 'notification.png'"
								alt="icon" />
						</div>
						<h2 class="mailbox__title">
							{{ JSON.parse(popup.titleName)[i18n.global.locale] }}
						</h2>
					</div>
					<div class="mailbox__popup--date">
						<span>{{ popup.startDate.slice(0, 10).replaceAll('-', '.') }}</span>
						-
						<span>{{ popup.endDate.slice(0, 10).replaceAll('-', '.') }}</span>
					</div>
				</div>
				<div class="mailbox__popup--content">
					<p class="mailbox__popup--desc">
						{{ JSON.parse(popup.descriptionText)[i18n.global.locale] }}
					</p>
				</div>
				<button class="mailbox__popup--btn" @click="showNotification(false)">
					<label v-if="popup.promocode.prizeAmount && i18n.global.locale == 'ru'">
						{{ i18n.global.t('get') }} {{ popup.promocode.prizeAmount }}
					</label>
					<label v-if="popup.promocode.prizeAmount && i18n.global.locale == 'uz'">
						{{ popup.promocode.prizeAmount }}
					</label>
					<label v-else>{{ i18n.global.t('close_notification') }}</label>
					<Coin v-if="popup.promocode.prizeAmount" />
					<Back color="green" v-else />
					<label v-if="popup.promocode.prizeAmount && i18n.global.locale == 'uz'">
						{{ i18n.global.t('get') }}
					</label>
				</button>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAppStore } from '../appStore';
import { textColor } from '../composables/useColor';
import { CheckAll, Back, Coin } from '../assets/icons';
import i18n from '../locales';
import useAppear from '../composables/useAppear';
import { getFormData } from '../composables/useFormData';
import axios from 'axios';

const appStore = useAppStore();
const appear = ref(false);
const popup = ref();

const showNotification = function (notification) {
	popup.value = notification;
	notification && notificationCheck(notification);
};
const notificationCheck = async function (notification) {
	const URL = 'https://api.pharmiq.uz/api/v1-1/spa-inboxMessage/postInboxMessageLog';
	const config = { headers: { Authorization: `Bearer ${appStore.token}` } };
	const formData = getFormData();
	formData.append('id', notification.id);
	try {
		const { data } = await axios.post(URL, formData, config);
		console.log(data);
	} catch (error) {
		console.log('Error', error);
	}
};
const notificationCheckAll = function () {
	notifications.value.forEach(not => {
		if (not.inbox_log) return; // Guard block

		notificationCheck(not);
	});
	getNotifications();
};
const getNotifications = async function () {
	const url = 'https://api.pharmiq.uz/api/v1-1/spa-inboxMessage';
	const formData = getFormData();
	const config = { headers: { Authorization: `Bearer ${appStore.token}` } };
	try {
		const { data } = await axios.get(url, config, formData);
		appStore.notifications = data;
	} catch (error) {
		console.log('Error: ', error);
	}
};

const notifications = computed(() => appStore.notifications.filter(notification => notification));
const isEmpty = computed(() => notifications.value.length == 0);
const mailboxIconStyle = computed(() => ({
	background: appStore.isDark ? '#000' : '',
	boxShadow: appStore.isDark ? '0 0 5px 5px rgba(53, 129, 132, 0.25)' : '',
}));
const mailboxHeadStyle = computed(() => ({
	transform: appear.value ? 'translateY(0)' : 'translateY(-3rem)',
	opacity: appear.value ? '1' : '0',
}));
const mailboxItemStyle = computed(() => ({
	transform: appear.value ? 'translateX(0)' : 'translateX(-100%)',
	opacity: appear.value ? '1' : '0',
}));

onMounted(() => useAppear(appear));
</script>

<style lang="scss" scoped>
$base-duration: 1.2s;
$delay-increment: 0.5s;

h1 {
	font-size: 2.4rem;
	font-weight: 500;
}
.mailbox {
	height: 100vh;
	padding-top: 1rem;
	padding-right: 4rem;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	&__head {
		display: flex;
		justify-content: space-between;
		transition: all 0.5s;
	}
	&__check {
		display: flex;
		gap: 1.4rem;
		& svg {
			cursor: pointer;
			width: 2.4rem;
			height: 2.4rem;
		}
		& p {
			color: var(--brand-solid-secondary-green, #4db1b1);
			font-size: 1.2rem;
			font-weight: 400;
			line-height: 2.2rem;
			letter-spacing: 0.048rem;
			text-transform: uppercase;
		}
	}
	&__icon {
		margin-right: 1.1rem;
		width: 6.4rem;
		height: 6.4rem;
		flex-shrink: 0;
		border-radius: 5rem;
		background: #effffe;
		box-shadow: 0px 0px 5px 0px rgba(53, 129, 132, 0.25) inset;
		display: flex;
		align-items: center;
		justify-content: center;
		& img {
			width: 70%;
			height: 70%;
			object-fit: cover;
		}
	}
	&__content {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		overflow-y: auto;
	}
	&__item {
		transition: all 1.2s;
		@for $i from 1 through 10 {
			&:nth-child(#{$i}) {
				transition: all $base-duration + ($delay-increment * ($i - 1));
			}
		}
		cursor: pointer;
		display: flex;
		align-items: center;
		&--date {
			display: flex;
			gap: 1rem;
		}
		&--info {
			color: #61c1c0;
			text-transform: uppercase;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
		}
		& p {
			color: #858597;
			font-weight: 400;
			letter-spacing: 0.064rem;
		}
	}
	&__span {
		font-size: 1.4rem;
	}
	&__title {
		font-size: 2rem;
		line-height: 2.2rem;
		letter-spacing: 0.08rem;
		margin-bottom: 0.4rem;
	}
	&__popup {
		z-index: 2000;
		display: flex;
		width: 50vw;
		max-width: 81.2rem;
		padding: 2rem;
		flex-direction: column;
		gap: 2rem;
		border-radius: 1.6rem;
		background: var(--Richard-Gradient, linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%));
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1);
		color: #fff;
		&--head {
			display: flex;
			justify-content: space-between;
			& div:first-child {
				display: flex;
				align-items: center;
			}
		}
		&--btn {
			display: flex;
			height: 4.8rem;
			padding: 1.2rem 1.6rem;
			justify-content: center;
			align-items: center;
			gap: 0.8rem;
			border-radius: 1rem;
			border: none;

			font-size: 1.4rem;
			font-weight: 600;
			line-height: 130%;
			text-transform: uppercase;
			& label {
				cursor: pointer;
				background: var(
					--Richard-Gradient,
					linear-gradient(102deg, #61c1c0 -0.69%, #358184 100%)
				);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
		&--desc {
			font-size: 1.7rem;
			font-weight: 400;
			line-height: 100%;
			letter-spacing: 0.068rem;
		}
	}
}
.fade-leave-active,
.fade-enter-active {
	transition: all 0.4s;
}
.fade-enter-from,
.fade-leave-to {
	transform: translate(-50%, -50%) scale(0.9);
	opacity: 0;
}
</style>
