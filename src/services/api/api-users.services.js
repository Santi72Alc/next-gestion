import dbConnected from "@Libs/utils/database";
import Users from "@Models/user.model";
import { comparePassword } from "@Libs/utils/auth";
import { usersConstants } from "@Services/constants";
const { initialUserProfile } = usersConstants

export const getUsersCount = async (filter = {}) => {
	const count = (await getAllUsers()).length
	return count;
};

export const getAllUsers = async () => {
	await dbConnected();
	const resp = await Users.find();
	return resp;
};

const newUser = async (body = initialUserProfile) => {
	try {
		await dbConnected();

		// const { email, password, fullName } = body;

		// Validamos los datos recibido para el nuevo usuario
		const isValid = await validateNewUser(body);
		if (isValid) {
			const newUser = new Users(body);
			newUser.save();
			const { password, ...data } = body
			return data
		} else return null
	} catch (error) {
		throw new Error(error.message)
	}
};

const validateNewUser = async (body = initialUserProfile) => {
	try {
		if (!body.email || !body.password || !body.fullName)
			throw new Error("Email, Password and Full Name are required");
		// Se busca si existe el usuario para comprobar que NO exista
		console.log("en newUser api-users.services", body)

		// const resp = await Users.findOne({ email });
		let userExists = false
		Users.exists({ email: body.email.toLowerCase() }, (err, doc) => {
			if (err) throw new Error(err)
			console.log("Doc en exist api-users.services", doc)
			userExists = doc ? true : false
		})

		if (userExists) throw new Error("The email already exists");
		return true;
	} catch (error) {
		throw new Error(error);
	}
};

const loginUser = async (email = "", passwordToCheck = "") => {
	try {
		await dbConnected();
		const resp = await Users.findOne({ email });
		// Quitamos 'passsword' de la data a devolver
		const { password, ...data } = resp._doc
		if (comparePassword(passwordToCheck, password)) return data
		return null
	} catch (error) {
		throw new Error(error.message);
	}
};

export default {
	newUser,
	loginUser,
	getAllUsers
};
