import { REGEX } from '@Constants/index.js'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'



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
    user_email: "santi72alc@gmail.com",
    user_fullName: "Santiago",
    user_nick: "",
    user_password: "1234",
    user_confirmPassword: "1234",
}


const initialCompany = {
    company_name: "BudgetCompany",
    company_email: "",
    company_vatId: "ES21500393Q",
    company_address: "",
    company_postalCode: "",
    company_city: "",
    company_province: "",
    company_country: "",
    company_phoneNumber1: "",
    company_phoneNumber2: "",
    company_bankIban: "",
    company_bankName: "",
    company_logo: "", // NO utilizado de momento
};

const defaultValues = {
    ...initialCompany,
    ...initialUser
}


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
        .required(MESSAGES.user.confirmPassword.required),

    // Company
    company_name: Yup.string().required(MESSAGES_MAIN.required("Company name")),
    company_email: Yup.string().email(MESSAGES_MAIN.invalidFormat('Company email')),
    company_vatId: Yup.string().matches(REGEX.vatCode, MESSAGES_MAIN.invalidFormat("VAT id")).required(MESSAGES_MAIN.required("VAT id")),
    company_phoneNumber1: Yup.string().matches(REGEX.phone, `${MESSAGES_MAIN.invalidFormat("Phone number 1")} (ex. +34 123456456)`),
    company_phoneNumber2: Yup.string().matches(REGEX.phone, `${MESSAGES_MAIN.invalidFormat("Phone number 2")} (ex. +34 123456456)`),
})


export default function FirstuserHTML(props) {

    // Llamamos a la prop 'onSubmit' que recibe desde el padre
    const handleSubmitData = (values) => {

            const user = {
                email: values.user_email,
                fullName: values.user_fullName,
                nick: values.user_nick,
                password: values.user_password,
            }
            const company = {
                name: values.company_name,
                email: values.company_email,
                vatId: values.company_vatId,
                address: values.company_address,
                postalCode: values.company_postalCode,
                city: values.company_city,
                province: values.company_province,
                country: values.company_country,
                phoneNumber1: values.company_phoneNumber1,
                phoneNumber2: values.company_phoneNumber2,
                bankIban: values.company_bankIban,
                bankName: values.company_bankName
            }
            props.onSubmit({ user, company })
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3 className="fst-italic">· Main Administrator ·</h3>
            </div>

            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitData}
                on
            >
                {({ errors }) => (
                    <Form >
                        <div className="card-body">
                            {/*** Admin Details ******************************************* */}
                            {/* email, fullName y nick */}
                            {/* password y confirmPassword */}
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="user_email">Email<sup>*</sup></label>
                                        <Field type="text" className="form-control"
                                            id="user_email" name="user_email"
                                            placeholder="Type your email"
                                        />
                                        <ErrorMessage name='user_email' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-5">
                                    <div className="form-group">
                                        <label htmlFor="user_fullName">Full name<sup>*</sup></label>
                                        <Field type="text" className="form-control"
                                            id="user_fullName" name="user_fullName"
                                            placeholder="Type your name"
                                        />
                                        <ErrorMessage name='user_fullName' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="user_nick">Nick</label>
                                        <Field type="text"
                                            id="user_nick" name="user_nick"
                                            className="form-control"
                                            placeholder="Type your nick"
                                        />
                                        <ErrorMessage name='user_nick' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="user_password">Password<sup>*</sup></label>
                                        <Field type="password" className="form-control"
                                            id="user_password" name="user_password"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage name='user_password' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="user_confirmPassword">Confirm Password</label>
                                        <Field type="password" className="form-control"
                                            id="user_confirmPassword" name="user_confirmPassword"
                                            placeholder="Confirm password"
                                        />
                                        <ErrorMessage name='user_confirmPassword' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                </div>
                            </div>

                            <div className="row text-dark">
                                <div className="col"><hr /></div>
                                <div className="col-6 col-md-4"><h5 className="text-center fst-italic">Company details (<span className="h6">required</span>)</h5></div>
                                <div className="col"><hr /></div>
                            </div>

                            {/*** Company Basic Details ************************************** */}
                            {/* name, email y taxId */}
                            {/* phoneNumber 1 y 2 */}
                            <details open>
                                <summary className={`${errors?.company_name || errors?.company_vatId ? 'text-danger' : 'text-dark'} fw-bold`}>Basic details</summary>

                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="company_name">Name<sup>*</sup></label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_name" name="company_name"
                                                placeholder="Type company name"
                                            />
                                            <ErrorMessage name='company_name' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>

                                    <div className="form-group col-12 col-md-4">
                                        <label htmlFor="company_email">Email</label>
                                        <Field type="email" className="form-control form-control-sm"
                                            id="company_email" name="company_email"
                                            placeholder="Type company email"
                                        />
                                        <ErrorMessage name='company_email' component={({ children }) => (
                                            <div className='text-danger'>{children}</div>
                                        )} />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="company_vatId">VAT/NIF/CIF<sup>*</sup></label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_vatId" name="company_vatId"
                                                placeholder="Tax identification"
                                            />
                                            <ErrorMessage name='company_vatId' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="co-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="company_phoneNumber1">Phone number 1</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_phoneNumber1" name='company_phoneNumber1'
                                                placeholder="Type phone number"
                                            />
                                            <ErrorMessage name='copmpany_phoneNumber1' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                    <div className="co-12 col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="company_phoneNumber2">Phone number 2</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_phoneNumber2" name="company_phoneNumber2"
                                                placeholder="Type phone number"
                                            />
                                            <ErrorMessage name='company_numberNumber2' component={({ children }) => (
                                                <div className='text-danger'>{children}</div>
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            </details>

                            {/*** Address ************************************************** */}
                            {/* address, codPostal */}
                            {/* countruy, province, city */}
                            <details>
                                <summary className="text-dark fw-bold">Address</summary>
                                <div className="row">
                                    <div className="co-12 col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="company_address">Address</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_address" name="company_address"
                                                placeholder="Type company address"
                                            />
                                        </div>
                                    </div>
                                    <div className="co-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="company_postalCode">Postal Code</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_postalCode" name="company_postalCode"
                                                placeholder="Type postal code"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="co-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="company_country">Country</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_country" name="company_country"
                                                placeholder="Select country"
                                            />
                                        </div>
                                    </div>
                                    <div className="co-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="company_province">Province</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_province" name="company_province"
                                                placeholder="Select province"
                                            />
                                        </div>
                                    </div>
                                    <div className="co-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="company_city">City</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_city" name="company_city"
                                                placeholder="Type company city"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </details>

                            <div className="row text-dark">
                                <div className="col"><hr /></div>
                                <div className="col-6 col-md-4"><h5 className="text-center fst-italic">More info</h5></div>
                                <div className="col"><hr /></div>
                            </div>
                            {/*** Bank Acount ************************************************ */}
                            {/* bankName */}
                            {/* bankIban */}
                            <details>
                                <summary className="text-dark fw-bold">Bank acount</summary>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="company_bankName">BankName</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_bankName" name="company_bankName"
                                                placeholder="Type phone number" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="company_bankIban">IBAN</label>
                                            <Field type="text" className="form-control form-control-sm"
                                                id="company_bankIban" name="company_bankIban"
                                                placeholder="IBAN acount number" />
                                        </div>
                                    </div>
                                </div>
                            </details>

                            {/* Others ************************************************** */}
                            {/* Logo */}
                            {/* <details>
                        <summary className="fw-bold">Others (logo, etc.)</summary>
                        <div className="row">
                            <div className="col-12 col-md-6 col-xl-5">
                                <div className="form-group">
                                    <label htmlFor="company_logo">Logo file</label>
                                    <input type="file" id="company_logo" name="company_logo"
                                        className="form-control form-control-sm"
                                        placeholder="Company logo" />
                                </div>
                            </div>
                        </div>
                    </details> */}
                        </div >
                        <div className="card-footer ">
                            <div className="hstack gap-3 justify-content-center">
                                <button type="submit" className="btn btn-primary w-50">
                                    Create Admin & Company!!
                                </button>
                                <button onClick={props.onCancel} className="btn btn-outline-secondary" data-action="CANCEL">
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
