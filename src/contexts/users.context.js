import { createContext, useState, useEffect } from "react";

import { ROLES, initialUserProfile } from "@Services/constants";
import usersServices from "@Services/users.services";

const initialUserContext = {
	isFirstUser: false,
	usersCount: 0,
	users: [
		{
			...initialUserProfile,
		},
	],
};

const UsersContext = createContext(initialUserContext);

export function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(0);
	const [isFirstUser, setIsFirstUser] = useState(true);

	useEffect(() => {
		updateUsersInfo();
	}, []);

	const updateUsersInfo = async () => {
		const users = await usersServices.getAllUsers();

		setUsers(users);
		setUsersCount(users.length);
		setIsFirstUser(users.length === 0);
	};

	/**
	 * Create a new user
	 * @param {object} user	{...initialUserProfile }
	 * @param {object} options { isAdmin, isFirstUser }
	 * @returns user || null
	 */
	const createUser = async (
		user = { ...initialUserProfile },
		options = { isAdmin: false, isFirstUser: false }
	) => {
		const role = getRoleName(options);
		const newUser = { role, ...user };
		const { data } = await usersServices.createUser({ user: newUser });
		return data;
	};

	const updateUser = async ({ user = { ...initialUserProfile } }) => {
		return await usersServices.updateUser({ user });
	};

	const getRoleName = ({ isAdmin = false, isFirstUser = false }) => {
		if (isAdmin) {
			return isFirstUser ? ROLES.MainAdmin : ROLES.Admin;
		} else return ROLES.Default;
	};

	const dataToExport = {
		usersCount,
		isFirstUser,
		users,
		createUser,
	};

	return (
		<UsersContext.Provider value={dataToExport}>
			{children}
		</UsersContext.Provider>
	);
}

export default UsersContext;
