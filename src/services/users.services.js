export const ROLES = {
	RootAdmin: "Root Admin",
	Admin: "Admin",
	User: "User",
	Default: "User",
};

export const initialUser = {
	email: "",
	password: "",
	fullName: "",
	nick: "",
	role: ROLES.Default,
};

async function loginUser({ email = "", password = "" }) {
	const resp = await validateUser({ email, password });
	if (resp.success) {
		return {
			success: true,
			data,
			message: resp.message,
		};
	}
	return {
		success: false,
		message: resp.message,
	};
}

const validateUser = ({ email = "", password = "" }) => {
	if (!email || !password)
		return {
			success: false,
			message: "Email & Password are required, please check!",
		};
	/* 
	* Hacemos la llamada al api de Users para ver si existe
	Si NO existe en la BD devolvemos false
	Si exite, devolvemos el user { email, fullName, Nick }
	*/

	console.log("en services validateUser", email, password);
	// USER DE EJEMPLO
	const user = {
		email,
		fullName: "Santiago San Román",
		nick: email.split("@")[0],
		role: ROLES.User,
	};
	if (password === "1234") {
		return { success: true, data: user, message: "User logged" };
	}
	return {
		success: false,
		message: "Error in Email or Password, please check!",
	};
};

async function addUser({
	email,
	password,
	fullName,
	nick,
	role,
} = initialUser) {
	try {
		await validateNewUser({ email, password, fullName });
		nick = nick || email.split("@")[0];
		/*  Creamos el nuevo usuario en la DB */
		// const body = { email, password, fullName, nick, role };
		// const newUser = new Users(body);
		// await newUser.save();
		return {
			success: true,
			data: { email, fullName, nick, role },
			message: `User ${fullName} added like ${role} role`
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
}

const validateNewUser = async ({ email, password, fullName } = initialUser) => {
	if (!email || !password || !fullName)
		throw new Error("Email, Password and Full Name are required");

	/* 
	 * Hacemos la llamada al api de Users para ver si existe
	 Si existe en la BD devolvemos false
	 Si no existe, devolvemos true
	*/

	const isSuccess = false;
	if (isSuccess) {
		throw new Error("The email already exists in database");
	}

	return true;
};

const getUsersCount = async () => {
	// Llamada al api para recoger el numero de usuarios en la BD
	let count = 0;
	return count;
};

const isFirstUser = async () => (await getUsersCount()) === 0;

export default {
	addUser,
	loginUser,
	getUsersCount,
	isFirstUser,
};
