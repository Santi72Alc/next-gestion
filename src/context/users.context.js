import { createContext, useState, useEffect } from "react";

import {
	ROLES,
	initialUserProfile,
	initialCompanyProfile,
} from "@Services/constants";
import usersServices from "@Services/users.services";

const initialUserContext = {
	isFirstUser: true,
	usersCount: 0,
	users: [{ ...initialUserProfile }],
};

const UsersContext = createContext(initialUserContext);

export function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(initialUserContext.usersCount);
	const [isFirstUser, setIsFirstUser] = useState(
		initialUserContext.isFirstUser
	);

	useEffect(() => {
		updateUsersInfo();
	}, []);

	const updateUsersInfo = async () => {
		const users = await usersServices.getAllUsers();
		setUsers(users);
		setUsersCount(users.length);
		setIsFirstUser(users.length === 0);
		return users;
	};

	/**
	 * Create a new user
	 * @param {object} user	{...initialUserProfile }
	 * @param {object} options { isAdmin, isFirstUser }
	 * @returns user || null
	 */
	const createUser = async (
		user = { ...initialUserProfile },
		options = { isAdmin: false, isFirstUser }
	) => {
		const role = getRoleName(options);
		const newUser = { role, ...user };
		const { data } = await usersServices.createUser((user = newUser));
		if (data.success) updateUsersInfo();
		return data;
	};

	const createMainAdmin = async (user, company) => {
		try {
			const resp = await createUser(user, {
				isAdmin: true,
				isFirstUser: true,
			});
			if (resp.success) {
				const adminId = resp.data._id;
				company.adminId = adminId;
				const { data } = await usersServices.createCompany(company);
				if (data.success)
					return {
						success: true,
						message: "Company & Main admin created!!",
					};
				// Borramos el usuario creado y actualizamos el estado de usuarios
				await usersServices.deleteUser(adminId);
				updateUsersInfo();
				return {
					success: false,
					message: "Error creating company",
				};
			} else return resp;
		} catch (error) {
			return {
				success: false,
				message: "Error creating Main admin or company" + error.message,
			};
		}
	};

	const updateUser = async ({ user = { ...initialUserProfile } }) => {
		return await usersServices.updateUser({ user });
	};

	const getRoleName = ({ isAdmin = false, isFirstUser = false }) => {
		if (isAdmin) {
			return isFirstUser ? ROLES.MainAdmin : ROLES.Admin;
		} else return ROLES.Default;
	};

	const getUserById = (id = "") => {
		return users.filter(user => user._id === id)[0];
	};

	const setFilterToUsers = ({ arrUsers = users, filter = "" }) => {
		if (!filter) return users;
		filter = filter.toLowerCase();
		return arrUsers.filter(user => {
			if (user.email.toLowerCase().includes(filter)) return user;
			if (user.nick.toLowerCase().includes(filter)) return user;
			if (user.fullName.toLowerCase().includes(filter)) return user;
		});
	};

	const dataToExport = {
		usersCount,
		isFirstUser,
		users,
		createMainAdmin,
		createUser,
		updateUser,
		getUserById,
		updateUsersInfo,
		setFilterToUsers,
	};

	return (
		<UsersContext.Provider value={dataToExport}>
			{children}
		</UsersContext.Provider>
	);
}

export default UsersContext;
