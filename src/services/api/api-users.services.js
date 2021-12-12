import dbConnected from "@Libs/utils/database";
import Users from "@Models/user.model";
import { comparePassword } from "@Libs/utils/auth";
import { initialUserProfile } from "@Constants/index.js";


export const getUsersCount = async (filter = {}) => {
	const count = (await getAllUsers()).length;
	return count;
};

export const getAllUsers = async () => {
	await dbConnected();
	const resp = await Users.find();
	return resp;
};

const newUser = async (body = initialUserProfile) => {
	try {
		if (!body.email || !body.password || !body.fullName)
			throw new Error("Email, Password and Full Name are required");

		await dbConnected();

		// Comprobamos si el usuario existe
		const userExists = await Users.exists({ email: body.email });
		if (userExists)
			return {
				success: false,
				message: "User already exists",
			};

		const newUser = new Users(body);
		await newUser.save();
		const { password, ...data } = newUser._doc;
		return {
			success: true,
			data,
			message: "User added",
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

const deleteUser = async userId => {
	try {
		if (!userId) {
			throw new Error("User id is required!");
		}
		const userDeleted = await Users.findByIdAndDelete(userId);
		if (userDeleted)
			return {
				success: true,
				message: "User deleted!",
			};
		return {
			success: false,
			message: "User to delete not found!"
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

const updateUser = async (user = initialUserProfile) => {
	try {
		if (!user._id) {
			throw new Error("User id is required!");
		}
		if (!user.fullName) throw new Error("Full Name are required!");
		await dbConnected();

		const userExists = await Users.exists({ _id: user._id });
		if (!userExists)
			return {
				success: false,
				message: "User not found",
			};

		// Buscamos el user por _id y actualizamos los datos recibidos
		const userUpdated = await Users.findByIdAndUpdate(
			user._id,
			{ ...user },
			{ new: true }
		);

		// Cogemos los campos del registro que nos interesa devolver
		if (userUpdated) {
			const { _id, email, fullName, nick, role } = userUpdated;
			return {
				success: true,
				data: { _id, email, fullName, nick, role },
				message: "Data user updated!",
			};
		}
		return {
			success: false,
			message: "Error updating data user!",
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

const loginUser = async (email = "", passwordToCheck = "") => {
	try {
		await dbConnected();
		const resp = await Users.findOne({ email });
		if (resp) {
			// Quitamos 'passsword' de la data a devolver
			const { password, ...data } = resp._doc;
			if (comparePassword(passwordToCheck, password)) {
				const { _id, email, fullName, nick, role } = data;
				return {
					success: true,
					data: { _id, email, fullName, nick, role },
					message: `User ${nick ? nick : fullName} logged`,
				};
			}
		}
		return {
			success: false,
			message: "User or Password not found, please check!!",
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default {
	loginUser,
	newUser,
	updateUser,
	deleteUser,
	getAllUsers,
};
