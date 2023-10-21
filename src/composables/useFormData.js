export const getDevice = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.includes('mobile') || userAgent.includes('android')) return 'Mobile device';
	else if (userAgent.includes('tablet')) return 'Tablet device';
	else return 'Desktop device';
};
export const getBrowser = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.includes('chrome')) return 'Chrome';
	else if (userAgent.includes('firefox')) return 'Firefox';
	else if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
	else if (userAgent.includes('edge')) return 'Edge';
	else if (userAgent.includes('opr') || userAgent.includes('opera')) return 'Opera';
	else return 'Chrome';
};

export const getFormData = () => {
	const formData = new FormData();
	/* Clear FormData */
	for (const data of formData) formData.delete(data);
	/* Essential FormData */
	formData.append('platform', 'academy');
	formData.append('browser', getBrowser());
	formData.append('device', getDevice());
	formData.append('timeZone', '500');
	return formData;
};
