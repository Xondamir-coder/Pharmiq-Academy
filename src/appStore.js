import axios from 'axios';
import env from './env.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.apikey}`,
};
const BASE_URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses';

export const useAppStore = defineStore('app', {
	state: () => ({
		showPreloader: true,
		courses: ref([]),
		ongoing: ref([]),
		passed: ref([]),
		name: ref(''),
		users: ref([]),
	}),
	actions: {
		async fetchAPI() {
			try {
				const [
					coursesResponse,
					ongoingResponse,
					passedResponse,
					userResponse,
					leadearboardResponse,
				] = await Promise.all([
					axios.get(`${BASE_URL}/coursesNew?params=free`, {
						headers: headers,
					}),
					axios.get(`${BASE_URL}/mycoursesNew?category_id=0&params=free`, { headers: headers }),
					axios.get(`${BASE_URL}/mycoursesPassedNew?category_id=0&params=free`, {
						headers: headers,
					}),
					axios.get(env.url.users, { headers: headers }),
					axios.get(env.url.leaderboard, { headers: headers }),
				]);

				this.courses = coursesResponse.data.courses.data;
				this.ongoing = ongoingResponse.data;
				this.passed = passedResponse.data;
				this.name = userResponse.data.user.firstName;
				this.users = leadearboardResponse.data;

				console.log('Courses : ', this.courses);
				console.log('Ongoing courses : ', this.ongoing);
				console.log('Passed courses : ', this.passed);
			} catch (error) {
				console.error('Error:', error);
			}
		},
		setShowPreloader(value) {
			this.showPreloader = value;
		},
	},
});
