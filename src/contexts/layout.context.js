import { ActualUserProvider } from "./actualUser.context";
import { UsersProvider } from "./users.context";

export function LayoutProviders({ children }) {
	return (
		<ActualUserProvider>
			<UsersProvider>{children}</UsersProvider>
		</ActualUserProvider>
	);
}
