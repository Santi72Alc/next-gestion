import { createContext, useState } from "react";

import authServices from "@Services/auth.services";
import storageServices from "@Services/sessionStorage.services";
import { initialAuthContext, ROLES } from "@Services/constants";

const AuthContext = createContext(initialAuthContext);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(initialAuthContext.user);
	const [isLogged, setIsLogged] = useState(initialAuthContext.isLogged);
	const [isMainAdmin, setIsMainAdmin] = useState(
		initialAuthContext.isMainAdmin
	);
	const [isAdmin, setIsAdmin] = useState(initialAuthContext.isAdmin);
	const [isUser, setIsUser] = useState(initialAuthContext.isUser);

	function hasUserThisRole(user, roles = []) {
		return roles.includes(user.role);
	}

	const setActualUser = (user = initialAuthContext.user) => {
		setUser(user);
		setIsLogged(true);
		setIsMainAdmin(hasUserThisRole(user, [ROLES.MainAdmin]));
		setIsAdmin(hasUserThisRole(user, [ROLES.MainAdmin, ROLES.Admin]));
		setIsUser(hasUserThisRole(user, [ROLES.User]));
	};

	const getActualUser = () => {
		// Miramos si está guardado el login del usuario
		const user = storageServices.getActualUser();
		user && setActualUser(user);
		return user;
	};

	const login = async (
		email = "",
		password = "",
		keepSessionAlive = true
	) => {
		const resp = await authServices.loginUser(email, password);
		if (resp.success) {
			const { _id, email, fullName, nick, role } = resp.data;
			const user = { _id, email, fullName, nick, role };
			setActualUser(user);
			// Keep the user in session
			storageServices.setActualUser(user, { keepSessionAlive });
		}
		return resp;
	};

	const logout = () => {
		storageServices.closeActualUser();
		setUser(initialAuthContext);
		setIsLogged(false);
	};

	const dataToExport = {
		user,
		login,
		logout,
		isMainAdmin,
		isAdmin,
		isUser,
		isLogged,
		setActualUser,
		getActualUser,
	};

	return (
		<AuthContext.Provider value={dataToExport}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
