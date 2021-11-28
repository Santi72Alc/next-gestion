import apiUsersServices from "@ApiServices/api-users.services";

export default async function handler(req, res) {
	// const {email, password, fullName, nick} = req.body
	try {
		const { email, password, fullName, nick, role } = req.body;
		const resp = await apiUsersServices.newUser({
			email,
			password,
			fullName,
			nick,
			role,
		});

		let status = 202;
		if (resp.success) status = 201;
		return res.status(status).json(resp);
	} catch (error) {
		return res.status(207).json({
			success: false,
			message: error.message,
		});
	}
}
