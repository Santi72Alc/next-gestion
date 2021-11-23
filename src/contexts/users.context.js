import { createContext, useState, useEffect } from "react";

import { ROLES, initialUserProfile } from "@Services/constants";
import usersServices from "@Services/users.services";

const UsersContext = createContext({
	isFirstUser: false,
	usersCount: 0,
	...initialUserProfile,
});

export function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(0);
	const [isFirstUser, setIsFirstUser] = useState(true);

	useEffect(() => {
		updateUsersInfo();
	}, []);

	const updateUsersInfo = () => {
		getAllUsers().then(users => {
			setUsers(users);
			setUsersCount(users.length);
			setIsFirstUser(users.length === 0);
		});
	};

	const getAllUsers = async () => {
		const { data } = await usersServices.getAllUsers();
		return data;
	};

	const createUser = async (
		{ user = initialUserProfile },
		{ isAdmin = false, isFirstUser = false }
	) => {
		if (!user.email || !user.fullName || !user.password) {
			return {
				success: false,
				message:
					"Email, Password and Full Name are required, please check!",
			};
		}
		const role = setRoleName({ isAdmin, isFirstUser });
		const newUser = { role, ...user };
		const { data } = await usersServices.createUser({ user: newUser });
		return data;
	};

	const updateUser = async ({ user = initialUserProfile }) => {
		if (!user._id) {
			return {
				success: false,
				message: "Error updating data",
			};
		}
		if (!user.fullName) {
			return {
				success: false,
				message: "Email and Full Name are required, please check!",
			};
		}
		return await usersServices.updateUser({ user });
	};

	const setRoleName = ({ isAdmin = false, isFirstUser = false }) => {
		if (isAdmin) {
			return isFirstUser ? ROLES.MainAdmin : ROLES.Admin;
		} else return ROLES.Default;
	};

	const dataToExport = {
		usersCount,
		isFirstUser,
		createUser,
		updateUser,
		updateUsersInfo,
		users,
	};

	return (
		<UsersContext.Provider value={dataToExport}>
			{children}
		</UsersContext.Provider>
	);
}

export default UsersContext;
