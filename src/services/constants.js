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
export const initialAuthContext = {
    _id: "",
    email: "",
    fullName: "",
    nick: "",
    role: "",
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
