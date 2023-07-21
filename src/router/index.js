import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.base_url),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
	],
});
export default router;
