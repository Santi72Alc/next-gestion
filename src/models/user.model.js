import { model, models, Schema } from "mongoose";
// import bcrypt from 'bcrypt'

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: [true, "The user email already exist"],
			required: [true, "The user email is required"],
		},
		fullName: String,
		nick: String,
		password: {
			type: String,
			minlength: [4, "The user password must be longer than 4ch"],
			required: [true, "The user password is required"],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// userSchema.pre('save', (next) => {
//     const user = this
//     if (user.isNew) {
//         const salt = bcrypt.genSaltSync(10)
//         user.password = bcrypt.hashSync(user.password, salt)
//         console.log("Codificada la pass ", user.password)
//     }
//     if (!user.nick) user.nick = user.email.split('@')[0]
//     next()
// })

const Users = models?.Users || model("Users", userSchema);

export default Users;
