import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { validateUser } from "../services/users.services";
import {
	getLocalStorage,
	setLocalStorage,
	deleteLocalStorage,
} from "./sessionStorage";

const UserContext = createContext();

const initialUser = {
	email: "",
	nick: "",
	token: "",
};

export function UserProvider({ children }) {
	const [user, setUser] = useState(initialUser);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		isLogged();
	}, [user]);

	/* Crear función de signUp para crear nuevo usuario */

	const login = ({ email, password }) => {
		const isValid = validateUser({ email, password });
		if (isValid) {
			const user = { email, nick: email.split("@")[0] };
			setUser(user);
			setLocalStorage(user);
		}
		return isValid;
	};

	const logout = () => {
		deleteLocalStorage();
		setUser(initialUser);
		Router.replace("/");
	};

	const isLogged = () => {
		const user = getLocalStorage();
		setIsLoggedIn(user?.email ? true : false);
	};

	const data = { user, login, logout, isLoggedIn };
	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserContext;
