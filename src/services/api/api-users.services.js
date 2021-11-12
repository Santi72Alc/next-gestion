import dbConnected from "@Libs/utils/database";
// Conectamos con la BD

export const newUser = async ({ email, password, fullName, nick }) => {
    let status = ''
	try {
		await dbConnected();
		if (!email) {
            status = 400
            throw new Error("Error in body format")
        }

		const body = { email, fullName, nick };
        status = 201
		return { success: true, status, data: body, message: 'User added' };
	} catch (error) {
		return { success: false, status, message: error.message};
	}
};
