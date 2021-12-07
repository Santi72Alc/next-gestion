import { ActualUserProvider } from "./actualUser.context";
import { UsersProvider } from "./users.context";
import { Toaster } from "react-hot-toast";

const toastOptions = {
	success: {
		duration: 4000,
		iconTheme: {
			primary: "green",
			secondary: "white",
		},
		style: {
			backgroundColor: "limegreen",
			color: "black",
		},
	},
	error: {
		duration: 4000,
		iconTheme: {
			primary: "red",
			secondary: "white",
		},
		style: {
			backgroundColor: "darkorange",
			color: "black",
		},
	},
};

export function LayoutProvidersContext({ children }) {
	return (
		<ActualUserProvider>
			<Toaster
				position="bottom-right"
				toastOptions={toastOptions}
				reverseOrder
			/>
			<UsersProvider>{children}</UsersProvider>
		</ActualUserProvider>
	);
}
