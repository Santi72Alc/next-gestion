import apiUsersServices from "@Services/api/api-users.services";

export default async function handler(req, res) {
	try {
		const resp = await apiUsersServices.updateUser(req.body);
		if (resp.success) res.status(200).json(resp);
		else res.status(202).json(resp);

	} catch (error) {
		return res.json(error.message);
	}
}
