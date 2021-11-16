import { createContext, useEffect, useState } from "react";

import authServices from "@Services/auth.services";
import storageServices, {
	defaultStorageData,
} from "@Services/sessionStorage.services";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(defaultStorageData);
	const [isLogged, setIsLogged] = useState(false);

	// useEffect(async () => {
	// 	setIsLogged(isLogged);
	// }, [user]);

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
		setUser(defaultStorageData);
		setIsLogged(false);
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

export default AuthContext;
