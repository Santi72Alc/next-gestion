import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import usersServices, { initialUser, ROLES } from "@Services/users.services";

import {
	getActualUser,
	closeActualUser,
	setActualUser,
	isLogged,
} from "@Services/sessionStorage.services";

const { password, ...initialUserState } = initialUser;
const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(initialUserState);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isFirstUser, setIsFirstUser] = useState(false);

	useEffect(async () => {
		const isFirstUser = await usersServices.isFirstUser();
		setIsFirstUser(isFirstUser);
		setIsLoggedIn(isLogged);
	}, [user]);

	const login = async (
		email = "",
		password = ""
	) => {
		const { data } = await usersServices.loginUser(email, password);
		if (data.success) {
			const { email, fullName, nick, role } = data.data;
			const user = { email, fullName, nick, role };
			setUser(user);
			setActualUser(user);
			setIsLoggedIn(true);
		}
		return data.success;
	};

	const logout = () => {
		closeActualUser();
		setUser(initialUser);
		setIsLoggedIn(false);
		Router.replace("/");
	};

	const dataToExport = {
		ROLES,
		user,
		login,
		logout,
		isLoggedIn,
		setIsLoggedIn,
		isFirstUser,
		setIsFirstUser,
		isAdmin: user?.email && getActualUser()?.role === ROLES.Admin,
		isMainAdmin: user?.email && getActualUser()?.role === ROLES.MainAdmin,
	};
	return (
		<UserContext.Provider value={dataToExport}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
