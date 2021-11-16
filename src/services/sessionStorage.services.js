const COOKIE_KEY = "gp-user";

const defaultOptions = {
	key: COOKIE_KEY,
};

export const defaultStorageData = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: "",
};

const setActualUser = (user = defaultStorageData, { key } = defaultOptions) => {
	if (
		!user._id ||
		!user.email ||
		!user.fullName ||
		!user.nick ||
		!user.role
	) {
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
	console.log("*** Error deploying cookies not allowed");
	return null;
};

const closeActualUser = ({ key } = defaultOptions) => {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(key);
	}
};

const isUserLogged = () => (getActualUser()?._id ? true : false);

export default {
	setActualUser,
	getActualUser,
	closeActualUser,
	isUserLogged,
};
