import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import usersServices from "@Services/users.services";
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

	const login = async ({ email = "", password = "" }) => {
		const resp = await usersServices.loginUser({ email, password });
		if (resp.success) {
			const { email, fullName, nick } = resp.data;
			const user = { email, fullName, nick };
			setUser(user);
			setLocalStorage(user);
		}
		return resp.success;
	};

	const newUser = ({
		email = "",
		password = "",
		fullName = "",
		nick = "",
	}) => {
		if (validateNewUser({ email, password })) {
			console.log("en services create", body);
		}
		const newUser = { email, fullName, nick };
		return newUser;
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

	const data = { user, login, newUser, logout, isLoggedIn };
	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserContext;
