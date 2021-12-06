import apiCompaniesServices from "@Services/api/api-companies.services";

export default async function handler(req, res) {
	try {
		const {
			adminId,
			name,
			email,
			vatId,
			address,
			postalCode,
			city,
			province,
			country,
			phoneNumber1,
			phoneNumber2,
			bankIban,
			bankName,
		} = req.body;

		let status = 202;
		const resp = await apiCompaniesServices.newCompany({
			adminId,
			name,
			email,
			vatId,
			address,
			postalCode,
			city,
			province,
			country,
			phoneNumber1,
			phoneNumber2,
			bankIban,
			bankName,
		});
		if (resp.success) status = 201;
		return res.status(status).json(resp);
	} catch (error) {
		return res.status(207).json({
			success: false,
			message: error.message,
		});
	}
}
