import { createContext, useState } from "react";
import {
	getLocalStorage,
	setLocalStorage,
	deleteLocalStorage,
} from "./sessionStorage";

const UserContext = createContext();

const initialUser = null;

export function UserProvider({ children }) {
	const [user, setUser] = useState(initialUser);

	const login = (user = null) => {
		const userSaved = setLocalStorage({ value: user });
		console.log("Logado");
		setUser(userSaved);
	};

	const logout = () => {
		deleteLocalStorage();
		setUser(null);
	};

	const data = { user, login, logout };

	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserContext;
