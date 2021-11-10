const initialUser = {
	email: "",
	password: "",
	fullName: "",
	nick: "",
};

const validateNewUser = ({ email = "", password = "", fullName = "" }) => {
	if (!email || !password || !fullName) return false;

	/* 
	 * Hacemos la llamada al api de Users para ver si existe
	 Si existe en la BD devolvemos false
	 Si no existe, Llamamos a la api para grabar el nuevo user
	 y devolvemos true
	*/

	return true;
};

const validateUser = ({ email = "", password = "" }) => {
	if (!email || !password) return false;
	/* 
	* Hacemos la llamada al api de Users para ver si existe
	Si NO existe en la BD devolvemos false
	Si exite, devolvemos el user { email, fullName, Nick }
	*/
	
	console.log("en services validateUser", email, password)
	if (password === "1234") {
		return true;
	}
	return false;
};

async function loginUser({ email = "", password = "" }) {
	if (validateUser({email, password})) {
		// De momento... luego se saca de la BD
		const fullName = "Santiago San Román";
		const nick = email.split("@")[0];
		return {
			success: true,
			data: { email, fullName, nick },
		};
	}
	return {
		success: false,
	};
}

async function addUser({
	email = "",
	password = "",
	fullName = "",
	nick = email.split("@")[0],
}) {
	try {
		if (!validateNewUser({ email, password, fullName })) {
			throw new Error("Email and Password are required");
		}

		const resp = { success: false };
		if (resp.success) {
			throw new Error("The email already exists");
		}

		const body = { email, password, fullName, nick };
		// const newUser = new Users(body);
		// await newUser.save();
		return {
			success: true,
			data: { email, fullName, nick },
			message: "User added",
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
		};
	}
}

export default {
	addUser,
	loginUser,
};
