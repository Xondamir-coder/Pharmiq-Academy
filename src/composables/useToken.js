export const getToken = () => {
	//My token = 13072|yZ7igMyaagOlnZX5fYg1J3RgU77sRwjMIJT5lPFo
	//Bosithonaka token = 11664|FQYyyD4qnpMbbQWhmY1OJ3gukn3J2GNML7H7MmWP

	let token = new URL(window.location.href).searchParams.get('token');
	if (!token) {
		const localToken = localStorage.getItem('token');
		token = localToken;
		if (!token) window.location.href = 'https://go.pharmiq.uz/redirect?redirected=academy';
		return token;
	} else localStorage.setItem('token', token);
	return token;
};
