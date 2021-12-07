import { createContext, useState } from "react";

import authServices from "@Services/auth.services";
import storageServices from "@Services/localStorage.services";
import { ROLES } from "@Services/constants";

const initialUser = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: ROLES.Default,
};

const initialUserContext = {
	isLogged: false,
	keepAlive: false,
	isMainAdmin: false,
	isAdmin: false,
	isUser: true,
	user: { ...initialUser },
};

const ActualUserContext = createContext(initialUserContext);

export function ActualUserProvider({ children }) {
	const [user, setUser] = useState(initialUser);
	const [keepAlive, setKeepAlive] = useState(initialUserContext.keepAlive);
	const [isLogged, setIsLogged] = useState(initialUserContext.isLogged);
	const [isMainAdmin, setIsMainAdmin] = useState(
		initialUserContext.isMainAdmin
	);
	const [isAdmin, setIsAdmin] = useState(initialUserContext.isAdmin);
	const [isUser, setIsUser] = useState(initialUserContext.isUser);

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
		keepAlive = initialContext.keepAlive
	) => {
		// Llamamos al servicio para logar el user
		// devuelve obj {success, data (usuario), message}
		const resp = await authServices.loginUser(email, password);
		if (resp.success) {
			const user = resp.data;
			setActualUser(user, { keepAlive });
			storageServices.setActualUser(user, { keepAlive });
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
		setIsLogged(initialUserContext.isLogged);
		setKeepAlive(initialUserContext.keepAlive);
		setIsMainAdmin(initialUserContext.isMainAdmin);
		setIsAdmin(initialUserContext.isAdmin);
		setIsUser(initialUserContext.isUser);
	};

	/*************************************************
	 * Get actual data from
	 * @param void
	 * @returns { isLogged, keepAlive, user }
	 */
	function getActualUser() {
		return { isMainAdmin, isAdmin, isUser, isLogged, user };
	}

	const setActualUser = (
		user = initialUser,
		options = { keepAlive: false }
	) => {
		const { _id, email, fullName, nick, role } = user;
		const isMainAdmin = hasUserRole(user, [ROLES.MainAdmin]);
		const isAdmin = isMainAdmin || hasUserRole(user, [ROLES.Admin]);
		const isUser = true;
		setUser({ _id, email, fullName, nick, role });
		setKeepAlive(options.keepAlive);
		setIsMainAdmin(isMainAdmin);
		setIsAdmin(isAdmin);
		setIsUser(isUser);
		setIsLogged(user ? true : false);
	};

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
		setActualUser,
	};

	return (
		<ActualUserContext.Provider value={dataToShare}>
			{children}
		</ActualUserContext.Provider>
	);
}

export default ActualUserContext;
