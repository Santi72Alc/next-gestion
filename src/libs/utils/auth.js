import bcrypt from "bcryptjs";

const HASH_SALT = 10;

export function hashPassword(password = "") {
	const hashedPassword = bcrypt.hashSync(password, HASH_SALT);
	return hashedPassword;
}

export function comparePassword(password, hashedPassword) {
	return bcrypt.compareSync(password, hashedPassword)
}