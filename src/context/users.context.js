import { createContext, useState, useEffect } from 'react'

import { usersConstants } from '@Services/constants';
import usersServices from '@Services/users.services';

const UsersContext = createContext();
const ROLES = usersConstants.ROLES

export function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(0);
	const [isFirstUser, setIsFirstUser] = useState(true)

	useEffect(async () => {
		const allUsers = []
		getAllUsers()
			.then(users => {
				allUsers = users
				setUsersCount(users.length);
				setIsFirstUser(users.length === 0 ? true : false)
				console.log("aaa", usersCount, isFirstUser)
			})
			.then(() => {
				console.log("***", allUsers)
			})
	});

	// useEffect(async () => {
	// 	const allUsers = await getAllUsers()
	// 	const countUsers = allUsers.length
	// 	setUsers(allUsers)
	// 	setUsersCount(countUsers)
	// 	setIsFirstUser(countUsers === 0)
	// }, [])

	const getAllUsers = async () => {
		const { data } = await usersServices.getAllUsers()
		return data
	}
	const createAdmin = async ({ admin = usersConstants.initialUserProfile }) => {
		try {
			const role = setRoleName({ isAdmin: true, isFirstUser })
			const newAdmin = { role, ...admin }
			const respAdmin = await usersServices.createUser({ user: newAdmin })

			// Si todo ha sido Ok añadimos el usuario a 'users'
			if (respAdmin.success) {

			}
			return respAdmin
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	}


	const setRoleName = ({ isAdmin = false, isFirstUser = false }) => {
		if (isAdmin) {
			return isFirstUser ? ROLES.MainAdmin : ROLES.Admin;
		} else return ROLES.Default;
	};



	const dataToExport = {
		usersCount,
		isFirstUser,
		createAdmin,
		users
	};

	return (
		<UsersContext.Provider value={dataToExport}>
			{children}
		</UsersContext.Provider>
	);
}

export default UsersContext;
