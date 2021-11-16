import apiUsersServices from "@Services/api/api-users.services";

export default async function handler(req, res) {
	try {
		const users = await apiUsersServices.getAllUsers();
		if (users) return res.status(200).json(users);
		else return res.status(500).json(users);
	} catch (error) {
		return res.json(error.message);
	}
}
