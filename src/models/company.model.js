import { model, models, Schema, Types } from "mongoose";

const companySchema = new Schema(
	{
		adminId: {
			type: Types.ObjectId,
			ref: "Users",
			required: [true, 'Admin Id is required']
		},
		name: {
			type: String,
			required: [true, 'Company name is required']
		},
		email: String,
		isActiva: {
			type: Boolean,
			default: true
		},
		address: {
			type: String,
			default: ""
		},
		postalCode: {
			type: String,
			default: ""
		},
		city: {
			type: String,
			default: ""
		},
		province: {
			type: String,
			default: ""
		},
		country: {
			type: String,
			default: ""
		},
		phoneNumber1: {
			type: String,
			default: ""
		},
		phoneNumber2: {
			type: String,
			default: ""
		},
		bankIban: {
			type: String,
			default: ""
		},
		bankName: {
			type: String,
			default: ""
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Companies = models?.Companies || model("Companies", companySchema);

export default Companies;
