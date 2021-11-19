const { AuthProvider } = require("./auth.context");
const { UsersProvider } = require("./users.context");


export function LayoutProviders({ children }) {

    return (
        <AuthProvider>
            <UsersProvider>
                {children}
            </UsersProvider>
        </AuthProvider>
    )
}
