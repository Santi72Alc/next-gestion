const COOKIE_KEY = "gp-user";

const defaultOptions = {
	key: COOKIE_KEY,
	keepAlive: false,
};

export const defaultStorageData = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: "",
	keepAlive: defaultOptions.keepAlive,
};

const setActualUser = (
	user,
	{
		key = defaultOptions.key,
		keepAlive = defaultOptions.keepAlive,
	}
) => {
	// NO se permite guardar en el storage de cliente
	if (typeof window === "undefined") {
		console.log("Error deploying cookies not allowed");
		return null;
	}

	// Ok. Guardamos los datos en el storage del cliente
	user.keepAlive = keepAlive;
	const dataToSave = JSON.stringify(user);
	if (keepAlive) localStorage.setItem(key, dataToSave);
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

const closeActualUser = ({ key, keepAlive } = defaultOptions) => {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(key);
		keepAlive && localStorage.removeItem(key);
	}
};

export default {
	setActualUser,
	getActualUser,
	closeActualUser,
};
