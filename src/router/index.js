import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LearnView from '../views/LearnView.vue';
import StatisticsView from '../views/StatisticsView.vue';
import StoreView from '../views/StoreView.vue';
import MailboxView from '../views/MailboxView.vue';
import SettingsView from '../views/SettingsView.vue';
import PharmacyView from '../views/PharmacyView.vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.base_url),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/learn',
			name: 'learning',
			component: LearnView,
		},
		{
			path: '/statistics',
			name: 'statistics',
			component: StatisticsView,
		},
		{
			path: '/pharmacy',
			name: 'pharmacy',
			component: PharmacyView,
		},
		{
			path: '/store',
			name: 'store',
			component: StoreView,
		},
		{
			path: '/mailbox',
			name: 'mailbox',
			component: MailboxView,
		},
		{
			path: '/settings',
			name: 'settigns',
			component: SettingsView,
		},
	],
});
export default router;
