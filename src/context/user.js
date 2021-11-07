import Router from "next/router";
import { createContext, useEffect, useState } from "react";
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

	const login = ({ email, password }) => {
		return validateUser({ email, password });
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

	const validateUser = ({ email, password }) => {
		if (isLoggedIn) {
			return true;
		}

		alert("Entro en comprobación del login:"+ email +" "+ password);
		/*
		 * Aqui se llamara 'servicios' para hacer la llamada a la BD y comprobar la existencia del user
		 */
		if (email && password === "1111") {
			const user = { email, nick: email.split("@")[0], token: "" };
			setUser(user);
			setLocalStorage(user);
			return true;
		}

		return false;
	};

	const data = { user, login, logout, isLoggedIn };
	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserContext;
