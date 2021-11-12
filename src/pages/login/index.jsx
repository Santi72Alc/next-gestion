import Router from 'next/router'
import { useContext } from 'react'

import Link from '@Components/link'
import UserContext from '@Context/user'
import myAlerts from '@Libs/alerts'

import styles from './login.module.css'

export default function Login() {
    const { login } = useContext(UserContext)


    async function handleLogin() {
        const $email = document.getElementById('email')
        const $password = document.getElementById('password')

        const isLogged = await login({ email: $email.value, password: $password.value })
        if (isLogged) {
            myAlerts.ToastSucces.fire({
                icon: "success",
                title: 'User logged'
            })
            Router.push("/")
        }
        else {
            myAlerts.Alert.fire({
                title: `Invalid email or password`,
                text: `Please, check it!!`,
                icon: "error",
                timer: 4500,
                returnFocus: false,

            }).then((resp) => {
                $email.focus()
                $password.value = ''
            })
        }
    }


    return (
        <div className="card">

            <div className="card-header">
                <h3 className="text-center">Sign in</h3>
            </div>

            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">User email</label>
                        <input type="email" id="email"
                            className="form-control"
                            placeholder="Type your registered email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"
                            className="form-control"
                            placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                id="isPermanent"
                            />
                            <label className="form-check-label" htmlFor="isPermanent">
                                Keep session alive
                            </label>
                        </div>
                    </div>
                </form>
            </div>

            <div className="card-footer p-4">
                <div className="vstack gap-2">
                    <button onClick={handleLogin} className="btn btn-primary w-50 mx-auto">I'm ready</button>
                    {/*
                        <Link href="/signup" className={`text-center ${styles.linkToRegister}`}>
                            I'm new here! Please, send me to register
                        </Link>
                    */}
                </div>
            </div>

        </div >
    )
}
