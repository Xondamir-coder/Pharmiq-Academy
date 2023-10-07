import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAppStore = defineStore('app', () => {
	const isDark = ref(false);
	const showPreloader = ref(true);

	/* Data */
	const user = ref({});
	const iqc = ref({});
	const company = ref({});
	const news = ref([]);
	const leaders = ref([]);
	const courses = ref([]);
	const ongoing = ref([]);
	const passed = ref([]);
	const pharmacy = ref([]);

	//Bositkhonaka token = 11511|iN2tBOLIxrjp0z6b3KIer0hI8zXXvissfD4p2k7D
	//My token = 10638|kw7JpzOBtw1Hig3w2bkCEsboQxS8FT9XDK4UcPbB
	let token = localStorage.getItem('token');
	if (!token) {
		const urlToken = new URL(window.location.href).searchParams.get('token');
		if (urlToken) {
			localStorage.setItem('token', urlToken);
			token = urlToken;
		} else {
			token = '10638|kw7JpzOBtw1Hig3w2bkCEsboQxS8FT9XDK4UcPbB';
		}
	}
	const BASE_URL = 'https://api.pharmiq.uz/api/v1-1';
	const NEWS_URL = 'https://api.pharmiq.uz/api/v1-1/spa-news';
	const USERS_URL = 'https://api.pharmiq.uz/api/v1-1/spa-users';
	const COURSES_URL = 'https://api.pharmiq.uz/api/v1-1/spa-courses';
	const config = { headers: { Authorization: `Bearer ${token}` } };

	const fetchData = async () => {
		try {
			const [
				{ data: userData },
				{ data: newsData },
				{ data: leaderboardData },
				{ data: coursesData },
				{ data: ongoingData },
				{ data: passedData },
				{ data: pharmacyData },
			] = await Promise.all([
				axios.get(`${BASE_URL}/mobile-user`, config),
				axios.get(`${NEWS_URL}?page=1`, config),
				axios.get(`${USERS_URL}/users-top-iqc-statistics`, config),
				axios.get(`${COURSES_URL}/coursesNew?params=free`, config),
				axios.get(`${COURSES_URL}/mycoursesNew?category_id=0&params=free`, config),
				axios.get(`${COURSES_URL}/mycoursesPassedNew?category_id=0&params=free`, config),
				axios.get(`${COURSES_URL}/coursesNew?params=special`, config),
			]);

			user.value = userData.user;
			iqc.value = userData.iqc;
			company.value = userData.company;
			news.value = newsData.data;
			leaders.value = leaderboardData;
			courses.value = coursesData.courses.data;
			ongoing.value = ongoingData.data;
			passed.value = passedData.data;
			pharmacy.value = pharmacyData.courses.data;
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const setShowPreloader = (value) => (showPreloader.value = value);

	return {
		isDark,
		showPreloader,
		token,
		user,
		iqc,
		company,
		news,
		leaders,
		courses,
		ongoing,
		passed,
		pharmacy,
		fetchData,
		setShowPreloader,
	};
});
