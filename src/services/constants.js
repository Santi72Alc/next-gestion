import countriesServices from "./countries.services"

const ROLES = {
    MainAdmin: "Main Admin",
    Admin: "Admin",
    User: "User",
    Default: "User",
}

export const usersConstants = {
    URL_USERS: "/api/v1/users",
    ROLES,
    initialUserProfile: {
        _id: "",
        email: "",
        password: "",
        fullName: "",
        nick: "",
        role: ROLES.Default,
    }
}

export const COUNTRIES = {
    getAll: () => countriesServices.getAllCountries(),
    getById: (id, property) => countriesServices.getCountry(id, property),
    names: countriesServices.getNames
}

const constants = {
    users: usersConstants,
    COUNTRIES
}

export default constants