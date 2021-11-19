import { createContext, useState, useEffect} from "react";

import { ROLES, initialUserProfile } from "@Services/constants";
import usersServices from "@Services/users.services";

const UsersContext = createContext({
	...initialUserProfile,
	isFirstUser: false,
	usersCount: 0,
});

export function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(0);
	const [isFirstUser, setIsFirstUser] = useState(true);

	useEffect(() => {
		updateUsersInfo();
	}, []);

	const updateUsersInfo = () => {
		getAllUsers()
			.then(users => {
				setUsers(users);
				return users;
			})
			.then(value => {
				setUsersCount(value.length);
				setIsFirstUser(value.length === 0);
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

	const setRoleName = ({ isAdmin = false, isFirstUser = false }) => {
		if (isAdmin) {
			return isFirstUser ? ROLES.MainAdmin : ROLES.Admin;
		} else return ROLES.Default;
	};

	const dataToExport = {
		usersCount,
		isFirstUser,
		createUser,
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
