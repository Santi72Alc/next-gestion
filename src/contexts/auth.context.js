import { createContext, useState } from "react";
import Router from "next/router";

import authServices from "@Services/auth.services";
import storageServices from "@Services/sessionStorage.services";
import { initialAuthContext } from '@Services/constants'

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(initialAuthContext);
	const [isLogged, setIsLogged] = useState(false);

	const login = async (email = "", password = "") => {
		const resp = await authServices.loginUser(email, password);
		if (resp.success) {
			const { _id, email, fullName, nick, role } = resp.data
			const user = { _id, email, fullName, nick, role }
			setUser(user);
			setIsLogged(true);
			// Keep the user in session
			storageServices.setActualUser(user);
		}
		return resp;
	};

	const logout = () => {
		storageServices.closeActualUser();
		setUser(initialAuthContext);
		setIsLogged(false);
		Router.replace("/")
	};

	const dataToExport = {
		user,
		login,
		logout,
		isLogged
	};

	return (
		<AuthContext.Provider value={dataToExport}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext
