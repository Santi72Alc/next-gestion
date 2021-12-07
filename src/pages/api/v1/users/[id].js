import apiUsersServices from "@Services/api/api-users.services";

const METHODS = {
	Update: "PATCH",
	Delete: "DELETE",
};

export default async function handler(req, res) {
	try {
		const method = req.method;
		let resp = {
			success: false,
			message: "",
		};

		if (method === METHODS.Update) {
			resp = await apiUsersServices.updateUser(req.body);
		}
		if (method === METHODS.Delete) {
			const userId = req.query.id;
			resp = await apiUsersServices.deleteUser(userId);
		}
		if (resp.success) res.status(200).json(resp);
		else res.status(202).json(resp);
	} catch (error) {
		return res.json(error.message);
	}
}
