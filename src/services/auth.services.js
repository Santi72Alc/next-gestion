import axios from "axios";
import { BASE_URL } from "./constants";

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
		// const url = `${URL_USERS}/login`;
		const { data } = await axios({
			method: "POST",
			baseURL: BASE_URL.USERS,
			url: "/login",
			data: { email, password },
		});
		return data;
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
}

export default {
	loginUser,
};
