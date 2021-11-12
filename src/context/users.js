import { createContext } from "react";

const UsersContext = createContext();


export function UsersProvider({ children }) {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(0);

	useEffect(async () => {
		setUsersCount(users.length);
	}, [users]);

	

	const data = { users, usersCount };
	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
}

export default UsersContext;
