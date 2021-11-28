import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-hot-toast'

import UsersContext from 'src/contexts/users.context'

export default function FirstUser() {
    const { isFirstUser, createUser, updateUsersInfo } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        await updateUsersInfo()
        !isFirstUser && router.replace("/")
    }, [])

    function getUserDataFromInputs() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const password2 = document.getElementById('password2').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value
        const isAdmin = isFirstUser

        return {
            email,
            password,
            password2,
            fullName,
            nick,
            isAdmin
        }
    }


    function getCompanyDataFromInputs() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const password2 = document.getElementById('password2').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value
        const isAdmin = isFirstUser

        return {
            email,
            password,
            password2,
            fullName,
            nick,
            isAdmin
        }
    }

    async function handleNewUser() {
        const { email, password, password2, fullName, nick, isAdmin } = getUserDataFromInputs()

        if (!email || !password || !fullName) {
            toast.error("Email, FullName and Password are required!")
            return false
        }
        if (password !== password2) {
            toast.error("Passwords don't match, please check!!")
            return false
        }

        // Llamamos al servicio para crear el Admin & Company
        const user = { email, password, fullName, nick }
        const resp = await createUser(user, { isAdmin, isFirstUser })
        // User created
        if (resp.success) {
            toast.success(resp.message)
            router.replace("/")
        } else {
            toast.error(resp.message)
        }
    }

    function handleInputEmail(event) {
        const $nickname = document.getElementById('nick')
        const email = event.target.value
        $nickname.value = $nickname.value || email.split('@')[0]
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                {/* <h3>Create a new user</h3> */}
                <h3 className="fst-italic">· Main Administrator ·</h3>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">User email</label>
                        <input type="email" id="email"
                            className="form-control"
                            placeholder="Type your email"
                            onChange={handleInputEmail}
                        />
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="fullName">Full name</label>
                                <input type="text" id="fullName"
                                    className="form-control"
                                    placeholder="Type your name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="nick">Nick</label>
                                <input type="text" id="nick"
                                    className="form-control"
                                    placeholder="Type your nick" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password"
                                    className="form-control"
                                    placeholder="Password" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Repeat Password</label>
                                <input type="password" id="password2"
                                    className="form-control"
                                    placeholder="Repeat password" />
                            </div>
                        </div>
                    </div>

                    <div className="row text-dark">
                        <div className="col"><hr /></div>
                        <div className="col-6 col-md-4"><h5 className="text-center fst-italic">Company details (<span className="h6">required</span>)</h5></div>
                        <div className="col"><hr /></div>
                    </div>
                    {/* Basic Details ******************************************* */}
                    <details open>
                        <summary className="fw-bold">Basic details</summary>

                        {/* Nombre, email y NIF */}
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="companyName">Name</label>
                                    <input type="text" id="companyName"
                                        className="form-control form-control-sm"
                                        defaultValue="Default Company Name"
                                        placeholder="Type company name" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group col-12 col-md-4">
                                <label htmlFor="companyEmail">Email</label>
                                <input type="email" id="companyEmail"
                                    className="form-control form-control-sm"
                                    placeholder="Type company email" />
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="companyTaxId">Tax Id / NIF</label>
                                    <input type="text" id="companyTaxId"
                                        className="form-control form-control-sm"
                                        placeholder="Tax identification" />
                                </div>
                            </div>
                        </div>

                        {/* Telefono 1 y 2 */}
                        <div className="row">
                            <div className="co-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="companyPhoneNumber1">Phone number 1</label>
                                    <input type="text" id="companyPhoneNumber1"
                                        className="form-control form-control-sm"
                                        placeholder="Type phone number" />
                                </div>
                            </div>
                            <div className="co-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="companyPhoneNumber2">Phone number 2</label>
                                    <input type="text" id="companyPhoneNumber2"
                                        className="form-control form-control-sm"
                                        placeholder="Type phone number" />
                                </div>
                            </div>
                        </div>
                    </details>

                    {/* Address ************************************************** */}
                    <details>
                        <summary className="fw-bold">Address</summary>
                        <div className="row">

                            {/* Dirección */}
                            <div className="co-12 col-md-8">
                                <div className="form-group">
                                    <label htmlFor="companyAddress">Address</label>
                                    <input type="text" id="companyAddress"
                                        className="form-control form-control-sm"
                                        placeholder="Type company address" />
                                </div>
                            </div>
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="companyPostalCode">Postal Code</label>
                                    <input type="text" id="companyPostalCode"
                                        className="form-control form-control-sm"
                                        placeholder="Type postal code" />
                                </div>
                            </div>
                        </div>

                        {/* País, Provincia, Ciudad */}
                        <div className="row">
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="companyCountry">Country</label>
                                    <input type="text" id="companyCountry"
                                        className="form-control form-control-sm"
                                        defaultValue="Spain"
                                        placeholder="Select country" />
                                </div>
                            </div>
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="companyProvince">Province</label>
                                    <input type="text" id="companyProvince"
                                        className="form-control form-control-sm"
                                        placeholder="Select province" />
                                </div>
                            </div>
                            <div className="co-12 col-md-4">
                                <div className="form-group">
                                    <label htmlFor="companyCity">City</label>
                                    <input type="text" id="companyCity"
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

                    {/* Bank Acount ************************************************ */}
                    <details>
                        <summary className="fw-bold">Bank acount</summary>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="companyBsnkName">BankName</label>
                                    <input type="text" id="companyBsnkName"
                                        className="form-control form-control-sm"
                                        placeholder="Type phone number" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="companyIban">IBAN</label>
                                    <input type="text" id="companyIban"
                                        className="form-control form-control-sm"
                                        placeholder="IBAN acount number" />
                                </div>
                            </div>
                        </div>

                    </details>

                    {/* Others ************************************************** */}
                    <details>
                        <summary className="fw-bold">Others (logo, etc.)</summary>
                        <div className="row">
                            <div className="col-12 col-md-6 col-xl-5">
                                {/* Logo */}
                                <div className="form-group">
                                    <label htmlFor="companyLogo">Logo file</label>
                                    <input type="file" id="companyLogo"
                                        className="form-control form-control-sm"
                                        placeholder="Company logo" />
                                </div>
                            </div>
                        </div>
                    </details>
                </form>
            </div >
            <div className="card-footer ">
                <div className="hstack gap-3 justify-content-center">
                    <button
                        onClick={handleNewUser}
                        className="btn btn-primary w-50"
                    >Add me!!
                    </button>
                    <button
                        onClick={() => router.replace("/")}
                        className="btn btn-outline-secondary"
                    >Cancel
                    </button>
                </div>
            </div>
        </div >
    )
}
