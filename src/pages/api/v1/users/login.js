import apiUsersServices from "@Services/api/api-users.services";

export default async function handler(req, res) {
	try {
		const { email, password } = req.body
		const user = await apiUsersServices.loginUser(email, password);
		if (user)
			return res.json({
				success: true,
				data: user,
				message: 'User logged'
			})
		return res.json({
			success: false,
			message: 'User or Password not valid, please check!!'
		});
	} catch (error) {
		return res.json(error.message);
	}
}
