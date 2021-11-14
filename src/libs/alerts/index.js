import Swal from "sweetalert2";

export const optsToast = {
	toast: true,
	position: "bottom-right",
	iconColor: "white",
	timer: 5000,
	showConfirmButton: false,
};

const Alert = Swal.mixin();

export const Toast = {
	success: Swal.mixin({
		...optsToast,
		
		customClass: {
			popup: "bg-success",
			title: "text-white text-bold",
			text: "text-white"
		},
	}),
	error:  Swal.mixin({
		...optsToast,
		customClass: {
			popup: "bg-danger",
			title: "text-white text-bold",
			text: "text-white"
		},
	}),
};


const Alerts = {
	Alert,
	ToastSucces: Toast.success,
	ToasError: Toast.error
}
export default Alerts