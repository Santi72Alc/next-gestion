import { createContext, useState } from "react";

import authServices from "@Services/auth.services";
import storageServices from "@Services/localStorage.services";
import { initialActualUserContext, ROLES } from "@Constants/index.js";


const ActualUserContext = createContext(initialActualUserContext);

export function ActualUserProvider({ children }) {
	const [user, setUser] = useState(initialActualUserContext.user);
	const [keepAlive, setKeepAlive] = useState(initialActualUserContext.keepAlive);
	const [isLogged, setIsLogged] = useState(initialActualUserContext.isLogged);
	const [isMainAdmin, setIsMainAdmin] = useState(
		initialActualUserContext.isMainAdmin
	);
	const [isAdmin, setIsAdmin] = useState(initialActualUserContext.isAdmin);
	const [isUser, setIsUser] = useState(initialActualUserContext.isUser);



	/*************************************************
	 * Login the user
	 * @param {string} email User email
	 * @param {string} password user password
	 * @param {boolean} keepAlive true if want to keep the login alive
	 * @returns { success: true|false, data?, message }
	 */
	const login = async (
		email = "",
		password = "",
		keepAlive = false
	) => {
		// Llamamos al servicio para logar el user
		// devuelve obj {success, data (usuario), message}
		const resp = await authServices.loginUser(email, password);
		if (resp.success) {
			const user = { ...resp.data, keepAlive };
			setActualUser(user);
		}
		return resp;
	};


	/*************************************************
	 * Logout the actual user logged
	 * @param void
	 * @returns void
	 */
	const logout = () => {
		storageServices.closeActualUser({ keepAlive });
		setUser(null);
		setIsLogged(initialActualUserContext.isLogged);
		setKeepAlive(initialActualUserContext.keepAlive);
		setIsMainAdmin(initialActualUserContext.isMainAdmin);
		setIsAdmin(initialActualUserContext.isAdmin);
		setIsUser(initialActualUserContext.isUser);
	};



	/*************************************************
	 * Get actual data from
	 * @param void
	 * @returns { isMainAdmin, isAdmin, isUser, isLogged, user }
	 */
	const getActualUser = () => {
		return { isMainAdmin, isAdmin, isUser, isLogged, user };
	}
	const setActualUser = (user) => {
		const { _id, keepAlive } = user;
		const isMainAdmin = hasUserRole(user, [ROLES.MainAdmin]);
		const isAdmin = isMainAdmin || hasUserRole(user, [ROLES.Admin]);
		const isUser = true;
		setUser(user);
		setKeepAlive(keepAlive);
		setIsMainAdmin(isMainAdmin);
		setIsAdmin(isAdmin);
		setIsUser(isUser);
		setIsLogged(_id ? true : false);
		storageServices.setActualUser(user);
	}

	const hasUserRole = (user, roles = []) => {
		return user && roles.includes(user.role);
	};

	const dataToShare = {
		user,
		isMainAdmin,
		isAdmin,
		isLogged,
		login,
		logout,
		getActualUser,
		setActualUser
	};

	return (
		<ActualUserContext.Provider value={dataToShare}>
			{children}
		</ActualUserContext.Provider>
	);
}

export default ActualUserContext;
