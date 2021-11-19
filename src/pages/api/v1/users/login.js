import apiUsersServices from "@Services/api/api-users.services";

export default async function handler(req, res) {
	try {
		const { email, password } = req.body;
		const resp = await apiUsersServices.loginUser(email, password);

		let status = 203;
		if (resp.success) status = 200;
		return res.status(status).json(resp);
	} catch (error) {
		return res.status(500).json(error.message);
	}
}
