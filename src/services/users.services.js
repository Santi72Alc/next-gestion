
const initialUser = {
	email: "",
	password: "",
	fullName: "",
	nick: "",
};

export const validateNewUser = ({ email, password }) => {
	if (!email || !password) return false;

	/* 
	 * Hacemos la llamada al api de Users para ver si existe
	 Si existe en la BD devolvemos false
	 Si no existe, Llamamos a la api para grabar el nuevo user
	 y devolvemos true
	*/
	 
	return false;
};

export const validateUser = ({ email, password }) => {
	if (!email || !password) return false;

	/* 
	 * Hacemos la llamada al api de Users para ver si existe
	 Si NO existe en la BD devolvemos false
	 Si exite, devolvemos el user { email, fullName, Nick }
	*/
	 
	if (email && password === "1234") {
		return true;
	}
	return false;
};


async function getAll() {
	try {
		const data = await Users.find();
		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			message: error.stack,
		};
	}
}

async function getOneByEmail(email) {
	try {
		const data = Users.findOne({ email });
		return {
			success: true,
			data,
		};
	} catch (error) {
		return {
			success: false,
			message: error.stack,
		};
	}
}

async function addUser({ email, password, fullName, nick }) {
	try {
		if (!email || !password)
			throw new Error("Email and Password are required");
		// const resp = await getOneByEmail(email.trim());
		const resp = { success: false };
		if (resp.success) throw new Error("The email already exists");
		const body = { email, password, fullName, nick };
		// const newUser = new Users(body);
		// await newUser.save();
		return {
			success: true,
			data: { email, fullName, nick },
		};
	} catch (error) {
		return {
			success: false,
			message: error.stack,
		};
	}
}

export default {
	validateUser,
};
