export function authHeader() {
	// return authorization header with jwt token
	let user = JSON.parse(localStorage.getItem('currentUser'));

	if (user && user.token) {
		return { Authorization: 'Bearer ' + user.token };
	} else {
		return {};
	}
}

export function authBearerString() {
	let user = JSON.parse(localStorage.getItem('currentUser'));

	if (user && user.token) {
		return 'Bearer ' + user.token;
	} else {
		return '';
	}
}

//export const getCurrentUser = {
//    let user = JSON.parse(localStorage.getItem("currentUser"));
//    return user;
//};

export let currentUser = JSON.parse(localStorage.getItem('currentUser'));
