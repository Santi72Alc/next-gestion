
/* CONTEXT */
const user = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: "",
	keepAlive: false
};



/* ACTUAL USER  */
export const initialActualUserContext = {
	user,
	isLogged: false,
	isMainAdmin: false,
	isAdmin: false,
	isMainAdmin: false,
	isUser: false,
};

export const COOKIE_KEY = "gp-user"