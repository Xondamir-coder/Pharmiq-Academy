import './main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './locales';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(i18n).mount('#app');
