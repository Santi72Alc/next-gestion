import dbConnected from "@Libs/utils/database";
import { initialUser } from "@Services/users.services";
import Users from "@Models/user.model";
import { comparePassword } from "@Libs/utils/auth";

const newUser = async (body = initialUser) => {
	try {
		await dbConnected();

		const { email, password, fullName } = body;

		// Validamos los datos recibido para el nuevo usuario
		const isValid = await validateNewUser(email, password, fullName);

		if (isValid) {
			const { password, ...data } = body;
			const newUser = new Users(body);
			newUser.save();
			return {
				success: true,
				data,
				message: "User added",
			};
		} else
			return {
				success: false,
				message: "Creating user. Something went wrong",
			};
	} catch (error) {
		return { success: false, message: error.message };
	}
};

const validateNewUser = async (email, password, fullName) => {
	if (!email || !password || !fullName)
		throw new Error("Email, Password and Full Name are required");
	try {
		/* 
		Buscamos en Users para ver si existe ese email
		Si existe en la BD devolvemos false
		Si no existe, devolvemos true
		*/
		const resp = await Users.findOne({ email });

		if (resp) throw new Error("The email already exists");
		return true;
	} catch (error) {
		throw new Error(error);
	}
};

const getUsers = async filter => {
	try {
		await dbConnected();
		const resp = await Users.find(filter);
		return {
			success: true,
			data: resp,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

const loginUser = async (email = "", passwordToCheck = "") => {
	try {
		await dbConnected();
		const { _doc } = await Users.findOne({ email });

		const { password, ...data } = _doc;
		if (comparePassword(passwordToCheck, password))
			return {
				success: true,
				data,
				message: "Users Logged",
			};
		return {
			success: false,
			message: "Email or Password wrong. Please check!",
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

const getUsersCount = async () => {
	try {
		await dbConnected();
		const resp = await getUsers({});
		return {
			success: true,
			data: resp.data.length,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default {
	newUser,
	getUsers,
	getUsersCount,
	loginUser,
};