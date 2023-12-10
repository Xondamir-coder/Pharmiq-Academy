import { getFormData } from './composables/useFormData';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { getToken } from './composables/useToken';

export const useAppStore = defineStore('app', () => {
	const isDark = ref(localStorage.getItem('isDark') || false);
	const showPreloader = ref(true);
	const query = ref('');

	/* Data */
	const user = ref({});
	const iqc = ref({});
	const company = ref({});
	const news = ref([]);
	const leaders = ref([]);
	const courses = ref();
	const ongoing = ref([]);
	const passed = ref([]);
	const pharmacy = ref([]);
	const transactions = ref([]);
	const stats = ref();
	const notifications = ref();
	const searchedCourses = ref();

	const token = getToken();
	const formData = getFormData();
	const BASE_URL = 'https://api.pharmiq.uz/api/v1-1';
	const NEWS_URL = `${BASE_URL}/spa-news`;
	const USERS_URL = `${BASE_URL}/spa-users`;
	const COURSES_URL = `${BASE_URL}/spa-courses`;
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
				{ data: transactionsData },
				{ data: statsData },
				{ data: notificationsData },
			] = await Promise.all([
				axios.get(`${BASE_URL}/mobile-user`, config),
				axios.get(`${NEWS_URL}?page=1`, config),
				axios.get(`${USERS_URL}/users-top-iqc-statistics?count=10`, config),
				axios.get(`${COURSES_URL}/coursesNew?params=free`, config),
				axios.get(`${COURSES_URL}/mycoursesNew?category_id=0&params=free`, config),
				axios.get(`${COURSES_URL}/mycoursesPassedNew?category_id=0&params=free`, config),
				axios.get(`${COURSES_URL}/coursesNew?params=special`, config),
				axios.get(`${USERS_URL}/user-transactions`, config),
				axios.get(`${USERS_URL}/user-course-count`, config),
				axios.get(`${BASE_URL}/spa-inboxMessage`, config, formData),
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
			transactions.value = transactionsData;
			stats.value = statsData;
			notifications.value = notificationsData;
		} catch (error) {
			handleError(error);
		}
	};
	const updateProfile = async newUser => {
		const { firstName, lastName, birthDate, gender } = newUser;
		const URL = `${USERS_URL}/user-info-change`;
		const formData = getFormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('birthDate', birthDate);
		formData.append('gender', gender);
		try {
			const { data } = await axios.post(URL, formData, config);
			console.log('Profile successfully updated! ', data);
			getUser();
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const getUser = async () => {
		const URL = `${BASE_URL}/mobile-user`;
		try {
			const { data } = await axios.get(URL, config);
			user.value = data.user;
			iqc.value = data.iqc;
			company.value = data.company;
			console.log('User refreshed: ', data);
		} catch (error) {
			handleError(error);
		}
	};
	const handleError = error => {
		console.error('Error:', error);
		if (error.response.status == 401) {
			localStorage.removeItem('token');
			window.location.href = 'https://go.pharmiq.uz/login';
		}
	};
	const setShowPreloader = value => (showPreloader.value = value);
	return {
		query,
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
		transactions,
		stats,
		notifications,
		searchedCourses,
		fetchData,
		getUser,
		updateProfile,
		setShowPreloader,
	};
});
