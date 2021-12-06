export const ROLES = {
	MainAdmin: "Main Admin",
	Admin: "Admin",
	User: "User",
	Default: "User",
};

export const BASE_URL = {
	USERS: "/api/v1/users",
	COMPANIES: "/api/v1/companies"
};

/* REGEX */
export const regex = {
	// regex phone numbers
	phone: /^$|\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/,
	// regex VAT numbers from Europe
	vatCode:
		/^$|^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU)?[0-9]{8}|(IT)?[0-9]{11}|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/,
};

/* CONTEXT */
const user = {
	_id: "",
	email: "",
	fullName: "",
	nick: "",
	role: "",
};
export const initialAuthContext = {
	user,
	isLogged: false,
	isMainAdmin: false,
	isAdmin: false,
	isMainAdmin: false,
	isUser: false,
};

/* USERS */
export const initialUserProfile = {
	...user,
	role: ROLES.Default,
};



export const initialCompanyProfile = {
    adminId: "",
	name: "",
	email: "",
	vatId: "",
	address: "",
	postalCode: "",
	city: "",
	province: "",
	country: "",
	phoneNumber1: "",
	phoneNumber2: "",
	bankIban: "",
	bankName: "",
	logo: "", // NO utilizado de momento
};