import { createContext, useState } from "react";

import authServices from "@Services/auth.services";
import storageServices from "@Services/localStorage.services";

const Roles = {
	MainAdmin: "Main Admin",
	Admin: "Admin",
	User: "User",
	default: "User",
};

const initialUser = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: Roles.default,
};

const initialUserContext = {
	isLogged: false,
	keepAlive: false,
	user: { ...initialUser },
};

const ActualUserContext = createContext(initialUserContext);

export function ActualUserProvider({ children }) {
	const [user, setUser] = useState(initialUser);
	const [keepAlive, setKeepAlive] = useState(initialUserContext.keepAlive);
	const [isLogged, setIsLogged] = useState(initialUserContext.isLogged);

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
		// if (!user.keepAlive) storageServices.closeActualUser();
		setUser(null);
		setIsLogged(initialUserContext.isLogged);
		setKeepAlive(initialUserContext.keepAlive);
		storageServices.closeActualUser();
	};

	/*************************************************
	 * Get actual data from
	 * @param void
	 * @returns { isLogged, keepAlive, user }
	 */
	function getActualUser() {
		return { isLogged, keepAlive, user };
	}

	const setActualUser = (
		user = initialUser,
		options = { keepAlive: false }
	) => {
		const { _id, email, fullName, nick, role } = user;
		setUser({ _id, email, fullName, nick, role });
		setKeepAlive(options.keepAlive);
		setIsLogged(true);
	};

	const hasUserRole = (roles = []) => {
		return user && roles.includes(user.role);
	};

	const dataToShare = {
		user,
		isLogged,
		login,
		logout,
		getActualUser,
		setActualUser,
		hasUserRole,
	};

	return (
		<ActualUserContext.Provider value={dataToShare}>
			{children}
		</ActualUserContext.Provider>
	);
}

export default ActualUserContext;
