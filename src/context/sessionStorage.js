const COOKIE_KEY = "gp-user";

const getSessionStorage = (key = COOKIE_KEY) => {
	if (typeof window !== "undefined") {
		const savedData =
			localStorage.getItem(key) || sessionStorage.getItem(key);
		const data = JSON.parse(savedData);
		return data;
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const setSessionStorage = ({
	user = { email, fullName, nick, role },
	key = COOKIE_KEY,
	KeepSessionAlive = false,
}) => {
	if (typeof window !== "undefined") {
		const dataToSave = JSON.stringify({ email, fullName, nick, role });
		KeepSessionAlive
			? localStorage.setItem(key, dataToSave)
			: sessionStorage.setItem(key, dataToSave);

		return user;
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const deleteSessionStorage = ({ key = COOKIE_KEY, keepAlive = false }) => {
	if (typeof window !== "undefined") {
		!keepAlive && localStorage.removeItem(key);
		sessionStorage.removeItem(key);
	}
	return null;
};

const getActualUser = () => getSessionStorage();

const closeActualUser = (keepAlive = false) =>
	deleteSessionStorage({ keepAlive });

export {
	setSessionStorage as setLocalStorage,
	getActualUser,
	closeActualUser,
};
