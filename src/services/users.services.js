import axios from "axios";

const URL_USERS = "/api/v1/users";

export const ROLES = {
	MainAdmin: "Main Admin",
	Admin: "Admin",
	User: "User",
	Default: "User",
};

export const initialUser = {
	email: "",
	password: "",
	fullName: "",
	nick: "",
	role: ROLES.Default,
};

async function loginUser(email = "", password = "") {
	try {
		if (!email || !password)
			throw new Error("Email and Password are required");

		/**
		 * Llamada (AXIOS) a la api para logar el usuario
		 * url: api/v?/users
		 * Tipo: GET
		 * data: { email, password }
		 * params: void
		 * query: void
		 */
		const url = `${URL_USERS}/login`;
		return await axios.get(url, { params: { email, password } });
	} catch (error) {
		console.log("Error logging user", error);
		return {
			success: false,
			message: error.message,
		};
	}
}

/*
	Create a new User
*/
const createUser = async (user = initialUser) => {
	try {
		if (!user.email || !user.password || !user.fullName)
			throw new Error("Email, Password and Full Name are required");

		/**
		 * Llamada (AXIOS) a la api para añadir el usuario
		 * url: api/v?/users/new
		 * Tipo: POST
		 * data: {email, password, fullName, nick, role }
		 * params: void
		 * query: void
		 */
		const url = `${URL_USERS}/new`;
		const { data } = await axios.post(url, { data: user });

		// ??? faltaria posible controlar el status
		return {
			success: true,
			data,
			message: `User ${data.fullName} added`,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

const getUsersCount = async () => {
	// Llamada al api para recoger el numero de usuarios en la BD
	try {
		/**
		 * Llamada (AXIOS) a la api para Número de usuarios
		 * url: api/v?/users
		 * Tipo: GET
		 * data: void
		 * params: void
		 * query: void
		 */
		const url = URL_USERS;
		const resp = await axios({
			method: "GET",
			url,
		});
		return {
			success: true,
			data: resp.data.length,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

const setRoleName = ({ isFirstUser = false, isAdmin = false }) => {
	if (isAdmin) {
		return isFirstUser ? ROLES.MainAdmin : ROLES.Admin;
	} else return ROLES.Default;
};

const isFirstUser = async () => {
	const { data } = await getUsersCount();
	return data === 0;
};

export default {
	createUser,
	loginUser,
	getUsersCount,
	isFirstUser,
	setRoleName,
};
