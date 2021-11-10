import { newUser } from "@ApiServices/api-users.services"

export default async function handler(req, res) {
	// const {email, password, fullName, nick} = req.body
	const data = req.body
	console.log(data)
	// const data = await newUser(req.body);
    return res.status(200).json(data);
}
