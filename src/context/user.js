import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import usersServices, { initialUser, ROLES } from "@Services/users.services";

import {
	getActualUser,
	closeActualUser,
	setLocalStorage,
} from "./sessionStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(initialUser);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isFirstUser, setIsFirstUser] = useState(false);

	useEffect(async () => {
		const isFirstUser = await usersServices.isFirstUser();
		setIsFirstUser(isFirstUser);
		isLogged();
	}, [user]);

	const login = async ({
		email = "",
		password = "",
		keepSessionAlive = false,
	}) => {
		const resp = await usersServices.loginUser({ email, password });
		if (resp.success) {
			const { email, fullName, nick, role } = resp.data;
			const user = { email, fullName, nick, role };
			setUser(user);
			setLocalStorage({ user, keepSessionAlive });
		}
		return resp.success;
	};

	const createUser = async (user = { ...initialUser, isAdmin: false }) => {
		let { isAdmin, ...newUser } = user;
		newUser.role = getRoleName(isAdmin);
		alert(JSON.stringify(newUser))
		return await usersServices.addUser(newUser);
	};

	const logout = ({ keepAlive = false }) => {
		closeActualUser(keepAlive);
		setUser(initialUser);
		Router.replace("/");
	};

	const isLogged = () => {
		const user = getActualUser();
		setIsLoggedIn(user?.email ? true : false);
	};

	const getRoleName = (isAdmin = false) => {
		if (isAdmin) {
			return isFirstUser ? ROLES.RootAdmin : ROLES.Admin;
		} else return ROLES.Default;
	};

	const dataToExport = {
		ROLES,
		user,
		login,
		createUser,
		logout,
		isLoggedIn,
		isFirstUser,
		isRootAdmin: getRoleName(true) === ROLES.RootAdmin,
	};
	return (
		<UserContext.Provider value={dataToExport}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
