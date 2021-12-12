import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";

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
    _id: "",
    email: "",
    fullName: "",
    nick: "",
    password: "",
    confirmPassword: "",
}


// regex phone numbers
const phoneRegExp = /^$|\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/

// regex VAT numbers from Europe
const vatRegex = /^$|^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU)?[0-9]{8}|(IT)?[0-9]{11}|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/

// Validaciones 
const validationSchemaNewUser = Yup.object().shape({
    // User (Admin) ... new user!!
    email: Yup.string().email(MESSAGES.user.email.invalidFormat).required(MESSAGES_MAIN.required("Email")),
    fullName: Yup.string().required(MESSAGES.user.fullName.required),
    password: Yup.string()
        .required(MESSAGES.user.password.required)
        .min(4, MESSAGES.user.password.min)
        .max(12, MESSAGES.user.password.max),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], MESSAGES.user.confirmPassword.match)
        .required(MESSAGES.user.confirmPassword.required)
})

const validationSchema = Yup.object().shape({
    // User (Admin)
    email: Yup.string().email(MESSAGES.user.email.invalidFormat).required(MESSAGES_MAIN.required("Email")),
    fullName: Yup.string().required(MESSAGES.user.fullName.required),
}).required()


export default function ProfileHTML(props) {
    const [isNewUser, setIsNewUser] = useState(props.isNewUser || false)
    const [dataUser, setDataUser] = useState(props.data || { ...initialUser })

    // Llamamos a la prop 'onSubmit'
    const handleSubmitData = (values) => {
        const { _id, email, fullName, nick, password } = values
        const user = { _id, email, fullName, nick, password }
        props.onSubmit({ user })
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3 className="fst-italic">· {isNewUser ? 'New user' : dataUser.nick} ·</h3>
            </div>

            <Formik
                initialValues={dataUser}
                onSubmit={handleSubmitData}
                validationSchema={isNewUser ? validationSchemaNewUser : validationSchema}
            >
                {() => (
                    <Form >
                        <div className="card-body">
                            {/*** Admin Details ******************************************* */}
                            {/* email, fullName y nick */}
                            {/* password y confirmPassword */}
                            <div className="row">
                                <div className={`col-12 ${isNewUser ? 'col-md-4' : 'col-md-12'}`} >
                                    <div className="form-group">
                                        <label htmlFor="email">Email<sup>*</sup></label>
                                        <Field type="text" className="form-control"
                                            id="email" name='email'
                                            placeholder="Type your email"
                                            disabled={!isNewUser}
                                        />
                                        <ErrorMessage name='email' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className={`col-12 ${isNewUser ? 'col-md-4' : 'col-md-6'}`}>
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full name<sup>*</sup></label>
                                            <Field type="text" className="form-control"
                                                id="fullName" name='fullName'
                                                placeholder="Type your name"
                                            />
                                            <ErrorMessage name='fullName' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                    <div className={`col-12 ${isNewUser ? 'col-md-4' : 'col-md-6'}`}>
                                        <div className="form-group">
                                            <label htmlFor="nick">Nick</label>
                                            <Field type="text" className="form-control"
                                                id="nick" name='nick'
                                                placeholder="Type your nick"
                                            />
                                            <ErrorMessage name='nick' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {isNewUser &&
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="password">Password<sup>*</sup></label>
                                            <Field type="password" className="form-control"
                                                id="password" name="password"
                                                placeholder="Password"
                                            />
                                            <ErrorMessage name='password' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <Field type="password" className="form-control"
                                                id="confirmPassword" name="confirmPassword"
                                                placeholder="Confirm password"
                                            />
                                            <ErrorMessage name='confirmPassword' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            }

                        </div >
                        <div className="card-footer ">
                            <div className="hstack gap-3 justify-content-center">
                                <button type="submit" className="btn btn-primary w-50" >
                                    {isNewUser ? 'Create User!' : 'Update user!'}
                                </button>
                                <button type="button" onClick={props.onCancel} className="btn btn-outline-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}
