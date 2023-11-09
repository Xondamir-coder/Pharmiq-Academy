import { createI18n } from 'vue-i18n';
import ru from './ru.json';
import uz from './uz.json';

const i18n = createI18n({
	locale: localStorage.getItem('lang') || 'ru',
	messages: {
		ru,
		uz,
	},
});

export default i18n;
