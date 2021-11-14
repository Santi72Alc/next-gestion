import apiUsersServices from "@Services/api/api-users.services";

export default async function handler(req, res) {
	try {
		const { email, password } = req.query;
		const resp = await apiUsersServices.loginUser(email, password);
		if (resp.success) return res.status(200).json(resp);
		else
			return res.status(202).json(resp);
	} catch (error) {
		return res.json(error.message);
	}
}
