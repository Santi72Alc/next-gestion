import { createContext, useState } from "react";

import authServices from "@Services/auth.services";
import storageServices from "@Services/sessionStorage.services";
import { initialAuthContext, ROLES } from "@Services/constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(initialAuthContext);
	const [isLogged, setIsLogged] = useState(false);
	const [isMainAdmin, setIsMainAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isUser, setIsUser] = useState(false);

	const login = async (email = "", password = "") => {
		const resp = await authServices.loginUser(email, password);
		if (resp.success) {
			const { _id, email, fullName, nick, role } = resp.data;
			const user = { _id, email, fullName, nick, role };
			setUser(user);
			setIsLogged(true);
			setIsMainAdmin(role === ROLES.MainAdmin ? true : false);
			setIsAdmin(
				[ROLES.MainAdmin, ROLES.Admin].includes(role) ? true : false
			);
			setIsUser(role === ROLES.User ? true : false);
			// Keep the user in session
			storageServices.setActualUser(user);
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
	};

	return (
		<AuthContext.Provider value={dataToExport}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
