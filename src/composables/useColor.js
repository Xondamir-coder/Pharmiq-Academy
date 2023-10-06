import { computed } from 'vue';
import { useAppStore } from '../appStore';

export const useColor = computed(() => {
	const appStore = useAppStore();
	return appStore.isDark ? '#fff' : '#000';
});

export const textColor = computed(() => ({
	color: useColor.value,
}));
