import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StatisticsView from '../views/StatisticsView.vue';
import StoreView from '../views/StoreView.vue';
import MailboxView from '../views/MailboxView.vue';
import SettingsView from '../views/SettingsView.vue';
import PharmacyView from '../views/PharmacyView.vue';
import NewsView from '../views/NewsView.vue';
import CourseView from '../views/CourseView.vue';
import LessonView from '../views/LessonView.vue';
import QuizView from '../views/QuizView.vue';

/* Components for Learn View */
import LearnView from '../views/LearnView.vue';
import Ongoing from '../components/Learn/Ongoing.vue';
import Courses from '../components/Learn/Courses.vue';
import Mypharmacy from '../components/Learn/Mypharmacy.vue';
import Completed from '../components/Learn/Completed.vue';
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
			name: 'learn',
			redirect: '/learn/courses',
			component: LearnView,
			children: [
				{
					path: 'ongoing',
					name: 'ongoing',
					component: Ongoing,
				},
				{
					path: 'courses',
					name: 'courses',
					component: Courses,
				},
				{
					path: 'mypharmacy',
					name: 'mypharmacy',
					component: Mypharmacy,
				},
				{
					path: 'completed',
					name: 'completed',
					component: Completed,
				},
			],
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
			name: 'settings',
			component: SettingsView,
		},
		{
			path: '/news/:id',
			name: 'news',
			component: NewsView,
		},
		{
			path: '/course/:id',
			name: 'course',
			component: CourseView,
		},
		{
			path: '/lesson/:id',
			name: 'lesson',
			component: LessonView,
		},
		{
			path: '/quiz/:id',
			name: 'quiz',
			component: QuizView,
		},
	],
});

router.beforeEach((to, from) => {
	if (to.name == 'quiz' && from.name != 'lesson') return { path: '/' };
});

export default router;
