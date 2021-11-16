import axios from "axios";

import { usersConstants } from "./constants";
/*
	Create a new MAIN ADMIN
*/
const createUser = async ({ user = usersConstants.initialUserProfile }) => {
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
		const url = `${usersConstants.URL_USERS}/new`;
		const { data } = await axios.post(url, user);

		return {
			success: true,
			data,
			message: `Main Admin ${data.fullName} added`,
		};
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
		const url = `${usersConstants.URL_USERS}`;
		const { data } = await axios.get(url);
		return {
			success: true,
			data,
			message: `All users feched`,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export default {
	createUser,
	getAllUsers
};
