const { AuthProvider } = require("./auth.context");
const { UsersProvider } = require("./users.context");


function LayoutProviders({ children }) {

    return (
        <AuthProvider>
            <UsersProvider>
                {children}
            </UsersProvider>
        </AuthProvider>
    )
}

export default LayoutProviders