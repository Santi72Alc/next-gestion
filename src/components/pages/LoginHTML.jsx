import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

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

    function onSubmitForm(values) {
        props.onSubmit(values)
    }

    return (
        <div className="card w-25 ">
            <div className="card-header">
                <h3 className="text-center">Login</h3>
            </div>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={props.onSubmit}
            >
                {() => (
                    <Form>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email"
                                    id="email" name="email"
                                    className="form-control"
                                    placeholder="Type your registered email"
                                />
                                <ErrorMessage name='email' component={({ children }) => (
                                    <div className='text-danger'>{children}</div>
                                )} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password"
                                    id="password" name="password"
                                    className="form-control"
                                    placeholder="Password" /
                                >
                                <ErrorMessage name='password' component={({ children }) => (
                                    <div className='text-danger'>{children}</div>
                                )} />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <Field className="form-check-input"
                                            type="checkbox"
                                            id="keepAlive" name="keepAlive"
                                        />
                                        Keep session alive
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <div className="hstack gap-3 justify-content-center">
                                <button type="submit" className="btn btn-primary w-50">Login</button>
                                <button type="button" onClick={props.onCancel} className="btn btn-outline-secondary">Cancel</button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>

        </div >
    )
}
