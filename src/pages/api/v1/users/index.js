import apiUsersServices from "@Services/api/api-users.services";

export default async function handler(req, res) {
	try {
		const resp = await apiUsersServices.getUsers({});

		if (resp.success) return res.status(200).json(resp.data);
		else return res.status(500).json(resp);
	} catch (error) {
		return res.json(error.message);
	}
}
