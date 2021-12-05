import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast'


const MESSAGES_MAIN = {
    required: (field = "This field") => `${field} is required!`,
    invalidFormat: (field = "") => `${field} - Invalid format`,
    errors: 'Some errors, please check!!'
}

const MESSAGES = {
    user: {
        email: {
            required: MESSAGES_MAIN.required('Email'),
            invalidFormat: MESSAGES_MAIN.invalidFormat('Email'),
        },
        fullName: {
            required: MESSAGES_MAIN.required('Full name'),
        },
        password: {
            min: `${MESSAGES_MAIN.invalidFormat("User Password")}, at least 4 characters`,
            max: `${MESSAGES_MAIN.invalidFormat("User Password")}, at most 12 characters`,
            required: MESSAGES_MAIN.required('Password'),
        },
        confirmPassword: {
            match: 'Passwords must match, please check!',
            required: MESSAGES_MAIN.required('Confirm Password'),

        }

    },
}


const initialUser = {
    user_email: "",
    user_fullName: "",
    user_nick: "",
    user_password: "",
    user_confirmPassword: "",
}


const defaultValues = {
    ...initialUser
}

// regex phone numbers
const phoneRegExp = /^$|\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/

// regex VAT numbers from Europe
const vatRegex = /^$|^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU)?[0-9]{8}|(IT)?[0-9]{11}|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/

// Validaciones 
const validationSchema = Yup.object().shape({
    // User (Admin)
    user_email: Yup.string().email(MESSAGES.user.email.invalidFormat).required(MESSAGES_MAIN.required("Email")),
    user_fullName: Yup.string().required(MESSAGES.user.fullName.required),
    user_password: Yup.string()
        .required(MESSAGES.user.password.required)
        .min(4, MESSAGES.user.password.min)
        .max(12, MESSAGES.user.password.max),
    user_confirmPassword: Yup.string()
        .oneOf([Yup.ref("user_password")], MESSAGES.user.confirmPassword.match)
        .required(MESSAGES.user.confirmPassword.required)
})


export default function FirstuserHTML(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        mode: "onChange",
        shouldFocusError: false,
        resolver: yupResolver(validationSchema)
    })


    // Llamamos a la prop 'onSubmit' que recibe desde el padre
    const handleSubmitData = (values) => {
        const user = {
            email: values.user_email,
            fullName: values.user_fullName,
            nick: values.user_nick,
            password: values.user_password,
        }

        props.onSubmit({ user })
    }


    const handleErrors = () => {
        const arrMessages = Object.values(errors).map(error => error.message)
        toast.error(() => (<div>
            <h5 className="text-center">Errors. Please check!</h5>
            <div className="fst-italic">
                {arrMessages.map((msg, index) =>
                    <p key={index} className="mb-0">*
                        {msg}</p>
                )}
            </div>
        </div>), {
            duration: 5000 + (arrMessages.length * 1000),
        })

    }

    // Función que permite actializar elnick del usuario
    function onBlurUserEmail(e) {
        const email = e.target.value
        const isValid = !(errors?.user_email?.message)
        const $nick = document.getElementById("user_nick")
        if (isValid && !$nick.value) $nick.value = (email.split("@")[0])
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3 className="fst-italic">· New User ·</h3>
            </div>

            <form onSubmit={handleSubmit(handleSubmitData, handleErrors)} >
                <div className="card-body">
                    {/*** Admin Details ******************************************* */}
                    {/* email, fullName y nick */}
                    {/* password y confirmPassword */}
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="user_email">Email<sup>*</sup></label>
                                <input type="text" className="form-control"
                                    {...register("user_email")} id="user_email"
                                    placeholder="Type your email"
                                    onBlur={onBlurUserEmail} />
                                {errors["user_email"] && <div className="text-danger">{errors["user_email"].message}</div>}
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="form-group">
                                <label htmlFor="user_fullName">Full name<sup>*</sup></label>
                                <input type="text"
                                    {...register("user_fullName")} id="user_fullName"
                                    className="form-control"
                                    placeholder="Type your name" />
                                {errors["user_fullName"] && <div className="text-danger">{errors["user_fullName"].message}</div>}
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="form-group">
                                <label htmlFor="user_nick">Nick</label>
                                <input type="text"
                                    {...register("user_nick")} id="user_nick"
                                    className="form-control"
                                    placeholder="Type your nick" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="user_password">Password<sup>*</sup></label>
                                <input type="password"
                                    {...register("user_password")} id="user_password"
                                    className="form-control"
                                    placeholder="Password" />
                                {errors["user_password"] && <div className="text-danger">{errors["user_password"].message}</div>}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="user_confirmPassword">Confirm Password</label>
                                <input type="password"
                                    {...register("user_confirmPassword")} id="user_confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm password" />
                                {errors["user_confirmPassword"] && <div className="text-danger">{errors["user_confirmPassword"].message}</div>}
                            </div>
                        </div>
                    </div>

                </div >
                <div className="card-footer ">
                    <div className="hstack gap-3 justify-content-center">
                        <button type="submit" className="btn btn-primary w-50">
                            Create User!!
                        </button>
                        <button onClick={props.onCancel} className="btn btn-outline-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>

        </div >
    )
}
