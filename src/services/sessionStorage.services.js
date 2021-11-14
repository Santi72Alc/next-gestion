const COOKIE_KEY = "gp-user";

const defaultOptions = {
	key: COOKIE_KEY,
};

const setActualUser = (
	{ email, fullName, nick, role },
	{ key } = defaultOptions
) => {
	const user = { email, fullName, nick, role };
	if (!user?.email || !user?.fullName || !user?.nick || !user?.role) {
		console.error("There are fields missing to save in 'client storage'");
		return null;
	}
	if (typeof window !== "undefined") {
		const dataToSave = JSON.stringify(user);
		sessionStorage.setItem(key, dataToSave);
		return user;
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const getActualUser = (key = COOKIE_KEY) => {
	if (typeof window !== "undefined") {
		const savedData = sessionStorage.getItem(key);
		const data = JSON.parse(savedData);
		return data;
	}
	console.log("Error deploying cookies not allowed");
	return null;
};

const closeActualUser = ({ key } = defaultOptions) => {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(key);
	}
	return null;
};

const isLogged = () => {
	if (getActualUser()) return true;
	return false;
};

export { setActualUser, getActualUser, closeActualUser, isLogged };
