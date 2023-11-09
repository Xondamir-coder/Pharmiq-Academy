export const getToken = () => {
	//Bositkhonaka token = 11511|iN2tBOLIxrjp0z6b3KIer0hI8zXXvissfD4p2k7D
	//My token = 12492|1iVsYUxy9v6wVmxqgg2pSwLmMqjB8bNo9xKoHd37
	//another token = 11664|FQYyyD4qnpMbbQWhmY1OJ3gukn3J2GNML7H7MmWP

	let token = new URL(window.location.href).searchParams.get('token');
	if (!token) {
		const localToken = localStorage.getItem('token');
		token = localToken;
		if (!token) window.location.href = 'https://go.pharmiq.uz/login';
		return token;
	} else localStorage.setItem('token', token);
	return token;
};
