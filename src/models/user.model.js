import { model, models, Schema } from "mongoose";

import { hashPassword } from "@Libs/utils/auth";
import { usersConstants } from "@Services/constants";

const ROLES = usersConstants.ROLES

const userSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			unique: [true, "The user email already exists"],
			required: [true, "The user email is required"],
		},
		fullName: {
			type: String,
			trim: true,
		},
		nick: {
			type: String,
			trim: true,
		},
		password: {
			type: String,
			minlength: [4, "The user password must be longer than 4ch"],
			required: [true, "The user password is required"],
		},
		role: {
			type: String,
			enum: Object.values(ROLES),
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.pre("save", function () {
	if (this.isNew) {
		const hashedPassword = hashPassword(this.password);
		this.password = hashedPassword;
	}
	if (!this.nick) this.nick = this.email.split("@")[0];
});

const Users = models?.Users || model("Users", userSchema);

export default Users;
