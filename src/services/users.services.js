import axios from "axios";

import {
	initialUserProfile,
	BASE_URL,
	initialCompanyProfile
} from "@Constants/index.js";

/*
	POST a new USER
*/
const createUser = async (user = { ...initialUserProfile, password }) => {
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

/*
	POST the company data
*/
const createCompany = async (company = { ...initialCompanyProfile }) => {
	try {
		if (!company.adminId) throw new Error("Error creating company!!");
		if (!company.name || !company.vatId)
			throw new Error("Name and VAT id are required, plase check!!");

		/**
		 * Llamada (AXIOS) a la api para añadir el usuario
		 * url: api/v?/users/new
		 * Tipo: POST
		 * data: { adminId, name, email, vatId, ...}
		 * params: void
		 * query: void
		 */
		return await axios({
			method: "POST",
			baseURL: BASE_URL.COMPANIES,
			url: "/new",
			data: company,
		});
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

/*
	UPDATE a user
*/
const updateUser = async ({ user = { ...initialUserProfile } }) => {
	try {
		if (!user._id) {
			throw new Error("Error updating data");
		}
		if (!user.email || !user.fullName)
			throw new Error("Email and Full Name are required, plase check!!");
		/**
		 * Llamada (AXIOS) a la api para editar el usuario
		 * url: api/v?/users/:id
		 * Tipo: PATCH
		 * data: {email, fullName, nick, role }
		 * params: id
		 * query: void
		 */
		return await axios({
			method: "PATCH",
			baseURL: BASE_URL.USERS,
			url: `/${user._id}`,
			data: user,
		});
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
};

/*
	DELETE a user 
*/
const deleteUser = async (userId = "") => {
	try {
		if (!userId) {
			throw new Error("Error updating data");
		}

		/**
		 * Llamada (AXIOS) a la api para borrar el usuario
		 * url: api/v?/users/:id
		 * Tipo: DELETE
		 * params: id
		 * query: void
		 */
		return await axios({
			method: "DELETE",
			baseURL: BASE_URL.USERS,
			url: `/${userId}`,
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
		const { data } = await axios({
			method: "GET",
			baseURL: BASE_URL.USERS,
			url: "/",
		});
		const users = data.map(user => {
			// Con esto filtramos los 'campos' que queremos tener compartidos del usuario
			const { _id, email, fullName, nick, role } = user;
			return { _id, email, fullName, nick, role };
		});
		return users;
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
	updateUser,
	deleteUser,
	createCompany,
};
