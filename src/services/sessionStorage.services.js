const COOKIE_KEY = "gp-user";

const defaultOptions = {
	key: COOKIE_KEY,
	keepSessionAlive: false,
};

export const defaultStorageData = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: "",
};

const setActualUser = (
	user = defaultStorageData,
	{
		key = defaultOptions.key,
		keepSessionAlive = defaultOptions.keepSessionAlive,
	}
) => {
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
	// NO se permite guardar en el storage de cliente
	if (typeof window === "undefined") {
		console.log("Error deploying cookies not allowed");
		return null;
	}

	// Ok. Guardamos los datos en el storage del cliente
	const dataToSave = JSON.stringify(user);
	if (keepSessionAlive) localStorage.setItem(key, dataToSave);
	else sessionStorage.setItem(key, dataToSave);
	return user;
};

const getActualUser = (key = defaultOptions.key) => {
	if (typeof window === "undefined") {
		console.log("*** Error deploying cookies not allowed");
		return null;
	}
	// Ok. Recogemos los datos del store del cliente
	const userSaved = localStorage.getItem(key) || sessionStorage.getItem(key);
	return JSON.parse(userSaved);
};

const closeActualUser = ({ key } = defaultOptions) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem(key);
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
