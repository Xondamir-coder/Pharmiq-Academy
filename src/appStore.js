import axios from 'axios';
import env from './env.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	Authorization: `Bearer ${env.apikey}`,
};
const API_BASE_URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses';

export const useAppStore = defineStore('app', {
	state: () => ({
		showPreloader: true,
		courses: ref([]),
		ongoing: ref([]),
		passed: ref([]),
	}),
	actions: {
		async fetchCoursesAndOngoing() {
			try {
				/* Courses */
				const coursesResponse = await axios.get(`${API_BASE_URL}/coursesNew?params=free`, {
					headers: headers,
				});
				this.courses = coursesResponse.data.courses.data;
				console.log('Courses : ', this.courses);

				/* Ongoing */
				const ongoingResponse = await axios.get(
					`${API_BASE_URL}/mycoursesNew?category_id=0&params=free`,
					{ headers: headers }
				);
				this.ongoing = ongoingResponse.data;
				console.log('Ongoing courses : ', this.ongoing);

				/* Passed */
				const passedResponse = await axios.get(
					`${API_BASE_URL}/mycoursesPassedNew?category_id=0&params=free`,
					{ headers: headers }
				);
				this.passed = passedResponse.data;
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
