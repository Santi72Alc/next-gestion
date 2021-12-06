import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'

const defaultValues = {
    email: "",
    password: "",
    keepAlive: false
}


const MESSAGES_MAIN = {
    required: (field = "") => `Field ${field} is required!`,
    invalidFormat: (field = "") => `${field} - Invalid format`,
    errors: 'Some errors, please check!!'
}


const MESSAGES = {
    email: {
        required: MESSAGES_MAIN.required('Email'),
        invalidFormat: MESSAGES_MAIN.invalidFormat('Email'),
    },
    password: {
        min: `${MESSAGES_MAIN.invalidFormat("Password")}, at least 4 characters`,
        max: `${MESSAGES_MAIN.invalidFormat("Password")}, at most 12 characters`,
        required: MESSAGES_MAIN.required('Password'),
    },
}

// Validaciones
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email(MESSAGES.email.invalidFormat)
        .required(MESSAGES.email.required),
    password: Yup.string()
        .required(MESSAGES.password.required)
        .min(4, MESSAGES.password.min)
        .max(12, MESSAGES.password.max),
})


export default function LoginHTML(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        shouldFocusError: false,
        resolver: yupResolver(validationSchema)
    })

    function onSubmitForm(values) {
        props.onSubmit(values)
    }

    return (
        <div className="card w-25 ">
            <div className="card-header">
                <h3 className="text-center">Login</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmitForm)}>

                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"
                            {...register("email")}
                            className="form-control"
                            placeholder="Type your registered email"
                        />
                        {errors["email"] && <div className="text-danger">{errors["email"].message}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"
                            {...register("password")}
                            className="form-control"
                            placeholder="Password" />
                        {errors["password"] && <div className="text-danger">{errors["password"].message}</div>}
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox" id="keepAlive"
                                {...register("keepAlive")}
                            />
                            <label className="form-check-label" htmlFor="keepAlive">
                                Keep session alive
                            </label>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <div className="hstack gap-3 justify-content-center">
                        <button type="submit" className="btn btn-primary w-50">Login</button>
                        <button onClick={props.onCancel} className="btn btn-outline-secondary">Cancel</button>
                    </div>
                </div>
            </form>

        </div >
    )
}
