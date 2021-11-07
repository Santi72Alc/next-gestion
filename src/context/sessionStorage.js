const COOKIE_KEY = "gp-user";

const getSessionStorage = (key = COOKIE_KEY) => {
	if (typeof window !== "undefined") {
		const data = JSON.parse(sessionStorage.getItem(key));
		return data;
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const setSessionStorage = (
	{ email, nick = email.split("@")[0], token = null },
	key = COOKIE_KEY
) => {
	if (typeof window !== "undefined") {
		const data = { email, nick, token };
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
