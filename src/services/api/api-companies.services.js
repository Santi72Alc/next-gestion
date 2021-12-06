import dbConnected from "@Libs/utils/database";

import Companies from "@Models/company.model";

import { initialCompanyProfile } from "@Services/constants";

const newCompany = async (body = initialCompanyProfile) => {
	try {
		if (!body.adminId) throw new Error("Error creating company");
		if (!body.name || !body.vatId)
			throw new Error("Company name & Company vatId are required");

		await dbConnected();

		// Comprobamos si la empresa existe
		const companyExist = await Companies.exists({ vatId: body.vatId });
		if (companyExist)
			return {
				success: false,
				message: "Company already exists",
			};

		const newCompany = new Companies(body);
		await newCompany.save();
		return {
			success: true,
			data: body,
			message: "Company saved",
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

// const updateCompany = async (company = initialCompanyProfile) => {
// 	try {
// 		if (!user._id) {
// 			throw new Error("Error updating data");
// 		}
// 		if (!user.fullName) throw new Error("Full Name are required");
// 		user;
// 		await dbConnected();

// 		const userExists = await Users.exists({ _id: user._id });
// 		if (!userExists)
// 			return {
// 				success: false,
// 				message: "User not found",
// 			};

// 		// Buscamos el user por _id y actualizamos los datos recibidos
// 		const userUpdated = await Users.findByIdAndUpdate(
// 			user._id,
// 			{ ...user },
// 			{ new: true }
// 		);

// 		// Cogemos los campos del registro que nos interesa devolver
// 		const { _id, email, fullName, nick, role } = userUpdated;
// 		if (userUpdated)
// 			return {
// 				success: true,
// 				data: { _id, email, fullName, nick, role },
// 				message: "Data user updated!",
// 			};
// 		return {
// 			success: false,
// 			message: "Error updating data user!",
// 		};
// 	} catch (error) {
// 		throw new Error(error.message);
// 	}
// };

export default {
	newCompany,
};
