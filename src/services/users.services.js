import axios from "axios";

import { initialUserProfile, BASE_URL } from "./constants";
/*
	Create a new MAIN ADMIN
*/
const createUser = async ({ user = initialUserProfile }) => {
	try {
		if (!user.email || !user.password || !user.fullName)
			throw new Error(
				"Email, Password and Full Name are required, plase check!!"
			);

		/**
		 * Llamada (AXIOS) a la api para añadir el usuario
		 * url: api/v?/users/new
		 * Tipo: POST
		 * data: {email, password, fullName, nick, role }
		 * params: void
		 * query: void
		 */
		// const url = `${usersConstants.URL_USERS}/new`;
		return await axios({
			method: "POST",
			baseURL: BASE_URL.USERS,
			url: "/new",
			data: user,
		});
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const getAllUsers = async () => {
	try {
		/**
		 * Llamada (AXIOS) a la api para recoger TODOS los users
		 * url: api/v?/users
		 * Tipo: GET
		 * data: void
		 * params: void
		 * query: void
		 */
		return await axios({
			method: "GET",
			baseURL: BASE_URL.USERS,
			url: "/",
		});
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export default {
	createUser,
	getAllUsers,
};
