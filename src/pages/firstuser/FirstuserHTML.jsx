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
    company_logo: "",       // NO utilizado de momento
}

const defaultValues = {
    ...initialCompany,
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
        .required(MESSAGES.user.confirmPassword.required),

    // Company
    company_name: Yup.string().required(MESSAGES_MAIN.required("Company name")),
    company_email: Yup.string().email(MESSAGES_MAIN.invalidFormat('Company email')),
    company_vatId: Yup.string().matches(vatRegex, MESSAGES_MAIN.invalidFormat("VAT id")).required(MESSAGES_MAIN.required("VAT id")),
    company_phoneNumber1: Yup.string().matches(phoneRegExp, `${MESSAGES_MAIN.invalidFormat("Phone number 1")} (ex. +34 123456456)`),
    company_phoneNumber2: Yup.string().matches(phoneRegExp, `${MESSAGES_MAIN.invalidFormat("Phone number 2")} (ex. +34 123456456)`),
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
            duration: 5000 + (arrMessages.length*1000),
        })

    }

    // Permite COLOREAR el apartado en caso de error en alguno 
    // de sus campos
    const classErrorCompanyBasicDetails = () => {
        const { company_name, company_email, company_vatId } = errors
        if (company_name || company_email || company_vatId) return "text-danger"
        return "text-dark"
    }

    /* NO SE USA POR QUE NO TIENE VALIDACIONES Y NO HACE FALTA */
    // const classErrorCompanyAddress = () => {
    //     const { company_address, company_postalCode, company_country, company_province, company_city } = errors
    //     if (company_address || company_postalCode || company_country || company_province || company_city) return "text-danger"
    //     return "text-dark"
    // }

    // Función que permite actializar elnick del usuario
    function onBlurUserEmail(e) {
        const email = e.target.value
        const isValid = !(errors?.user_email?.message)
        const $nick = document.getElementById("user_nick")
        if (isValid && !$nick.value) $nick.value = email.split("@")[0]
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3 className="fst-italic">· Main Administrator ·</h3>
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

                    <div className="row text-dark">
                        <div className="col"><hr /></div>
                        <div className="col-6 col-md-4"><h5 className="text-center fst-italic">Company details (<span className="h6">required</span>)</h5></div>
                        <div className="col"><hr /></div>
                    </div>

                    {/*** Company Basic Details ************************************** */}
                    {/* name, email y taxId */}
                    {/* phoneNumber 1 y 2 */}
                    <details open>
                        <summary className={`${classErrorCompanyBasicDetails()} fw-bold`}>Basic details</summary>

                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="company_name">Name<sup>*</sup></label>
                                    <input type="text" id="company_name"
                                        {...register("company_name")}
                                        className="form-control form-control-sm"
                                        placeholder="Type company name"
                                    />
                                    {errors["company_name"] && <div className="text-danger">{errors["company_name"].message}</div>}
                                </div>
                            </div>

                            <div className="form-group col-12 col-md-4">
                                <label htmlFor="company_email">Email</label>
                                <input type="email" id="company_email"
                                    {...register("company_email")}
                                    className="form-control form-control-sm"
                                    placeholder="Type company email" />
                                {errors["company_email"] && <div className="text-danger">{errors["company_email"].message}</div>}
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="company_vatId">VAT/NIF/CIF<sup>*</sup></label>
                                    <input type="text" id="company_vatId"
                                        {...register("company_vatId")}
                                        className="form-control form-control-sm"
                                        placeholder="Tax identification" />
                                    {errors["company_vatId"] && <div className="text-danger">{errors["company_vatId"].message}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="co-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="company_phoneNumber1">Phone number 1</label>
                                    <input type="text" id="company_phoneNumber1"
                                        {...register("company_phoneNumber1")}
                                        className="form-control form-control-sm"
                                        placeholder="Type phone number" />
                                    {errors["company_phoneNumber1"] && <div className="text-danger">{errors["company_phoneNumber1"].message}</div>}
                                </div>
                            </div>
                            <div className="co-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="company_phoneNumber2">Phone number 2</label>
                                    <input type="text" id="company_phoneNumber2"
                                        {...register("company_phoneNumber2")}
                                        className="form-control form-control-sm"
                                        placeholder="Type phone number" />
                                    {errors["company_phoneNumber2"] && <div className="text-danger">{errors["company_phoneNumber2"].message}</div>}
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
                                    <input type="text" id="company_address"
                                        {...register("company_address")}
                                        className="form-control form-control-sm"
                                        placeholder="Type company address" />
                                </div>
                            </div>
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="company_postalCode">Postal Code</label>
                                    <input type="text" id="company_postalCode"
                                        {...register("company_postalCode")}
                                        className="form-control form-control-sm"
                                        placeholder="Type postal code" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="company_country">Country</label>
                                    <input type="text" id="company_country"
                                        {...register("company_country")}
                                        className="form-control form-control-sm"
                                        placeholder="Select country" />
                                </div>
                            </div>
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="company_province">Province</label>
                                    <input type="text" id="company_province"
                                        {...register("company_province")}
                                        className="form-control form-control-sm"
                                        placeholder="Select province" />
                                </div>
                            </div>
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="company_city">City</label>
                                    <input type="text" id="company_city"
                                        {...register("company_city")}
                                        className="form-control form-control-sm"
                                        placeholder="Type company city" />
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
                                    <input type="text" id="company_bankName"
                                        {...register("company_bankName")}
                                        className="form-control form-control-sm"
                                        placeholder="Type phone number" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="company_bankIban">IBAN</label>
                                    <input type="text" id="company_bankIban"
                                        {...register("company_bankIban")}
                                        className="form-control form-control-sm"
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
                        <button onClick={props.onCancel} className="btn btn-outline-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>

        </div >
    )
}
