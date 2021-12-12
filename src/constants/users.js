/* USERS */
export const ROLES = {
	MainAdmin: "Main Admin",
	Admin: "Admin",
	User: "User",
	Default: "User",
};


const user = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: "",
};


export const initialUserProfile = {
	...user,
	role: ROLES.Default,
};
