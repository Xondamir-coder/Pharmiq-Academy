import axios from 'axios';
import env from './env.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', {
	state: () => ({
		showPreloader: true,
		courses: ref([]),
	}),
	actions: {
		async getCourses() {
			try {
				const headers = {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${env.apikey}`,
				};
				const URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses/coursesNew?params=free';
				const response = await axios.get(URL, { headers: headers });
				this.courses = response.data.courses.data;
				console.log(this.courses);
			} catch (error) {
				console.error('Error : ', error);
			}
		},

		setShowPreloader(value) {
			this.showPreloader = value;
		},
	},
});
