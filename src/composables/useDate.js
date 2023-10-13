export const getCurrentDate = () => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const currentDate = new Date();
	const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')} ${
		months[currentDate.getMonth()]
	} ${currentDate.getFullYear()}`;
	return formattedDate;
};
