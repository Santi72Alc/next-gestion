const COOKIE_KEY = "gp-user";

const getSessionStorage = (key = COOKIE_KEY) => {
	if (typeof window !== "undefined") {
		const data = JSON.parse(sessionStorage.getItem(key));
		return data
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const setSessionStorage = ({ email, fullName, nick }, key = COOKIE_KEY) => {
	if (typeof window !== "undefined") {
		const data = { email, fullName, nick };
		sessionStorage.setItem(key, JSON.stringify(data));
		return data;
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const deleteSessionStorage = (key = COOKIE_KEY) => {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(key);
	}
	return null;
};

export {
	getSessionStorage as getLocalStorage,
	setSessionStorage as setLocalStorage,
	deleteSessionStorage as deleteLocalStorage,
};
