import Swal from "sweetalert2";

const optsToast = {
	toast: true,
	position: "bottom-right",
	iconColor: "white",
	timer: 5000,
	showConfirmButton: false,
};

const Alert = Swal.mixin();


export const ToastSuccess = Swal.mixin({
	...optsToast,
	icon: "success",
	customClass: {
		popup: "bg-success",
		title: "text-white text-bold",
		text: "text-white"
	},
})

export const ToastError = Swal.mixin({
	...optsToast,
	icon: "error",
	customClass: {
		popup: "bg-danger",
		title: "text-white text-bold",
		text: "text-white"
	},
})


const Alerts = {
	Alert,
	ToastSuccess,
	ToastError
}
export default Alerts