export const ROLES = {
    MainAdmin: "Main Admin",
    Admin: "Admin",
    User: "User",
    Default: "User",
}

export const BASE_URL = {
    USERS: "/api/v1/users"
}

/* CONTEXT */
const user = {
    _id: "",
    email: "",
    fullName: "",
    nick: "",
    role: "",
}
export const initialAuthContext = {
   user,
   isLogged: false,
   isMainAdmin: false,
   isAdmin: false,
   isMainAdmin: false,
   isUser: false
}

/* USERS */
export const initialUserProfile = {
    _id: "",
    email: "",
    password: "",
    fullName: "",
    nick: "",
    role: ROLES.Default,
}
