import { model, models, Schema, Types } from "mongoose";

const companySchema = new Schema(
	{
		adminId: {
			type: Types.ObjectId,
			ref: "Users",
		},
		name: {
			type: String,
			required: [true, 'Company name is required']
		},
		logo: {
			type: String,
			default: ""
		},
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
		country: {
			type: String,
			enum: COUNTRIES,
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
