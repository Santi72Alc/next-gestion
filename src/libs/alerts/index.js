import Swal from "sweetalert2";

const optsToast = {
    toast: true,
	position: "bottom-right",
	iconColor: "white",
	timer: 3000,
	timerProgressBar: true,
	showConfirmButton: false,
};

const Alert = Swal.mixin();

export const Toast = {
	success: Swal.mixin({ 
        ...optsToast, 
        customClass:  {
            popup: "bg-success",
            title: "text-white"
        }
    }),
	error: Swal.mixin({
		...optsToast,
		customClass: {
            popup: "bg-danger",
            text: "text-white"
		},
	}),
};

export default Alert;
