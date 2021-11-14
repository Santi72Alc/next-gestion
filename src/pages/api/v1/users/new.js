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

		if (resp.success) return res.status(201).json(resp.data);
		else return res.status(500).json(resp);
	} catch (error) {
		return res.json(error.message);
	}
}
