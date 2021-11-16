import { useContext, useEffect } from 'react'
import Router from 'next/router'

import Link from '@Components/link'
import AuthContext from '@Context/auth.context'
import UsersContext from '@Context/users.context'

import { ToastError, ToastSuccess } from '@Libs/alerts'

import styles from './login.module.css'

export default function Login() {
    const { login } = useContext(AuthContext)
    const { isFirstUser } = useContext(UsersContext)

    async function handleLogin() {
        const $email = document.getElementById('email')
        const $password = document.getElementById('password')
        // const keepAlive = document.getElementById('keepAlive').checked

        const resp = await login($email.value, $password.value)
        if (resp.success) {
            ToastSuccess.fire({
                titleText: resp.message
            })
            Router.replace("/")
        }
        else {
            ToastError.fire({
                titleText: resp.message,
            })
            $email.focus()
            $password.value = ''
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
                    {/*  <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                id="keepAlive"
                            />
                            <label className="form-check-label" htmlFor="keepAlive">
                                Keep session alive
                            </label>
                        </div>
                    </div> */}
                </form>
            </div>

            <div className="card-footer p-4">
                <div className="vstack gap-2">
                    <button onClick={handleLogin} className="btn btn-primary w-50 mx-auto">Login</button>

                    {isFirstUser &&
                        <div className="vstack text-center mt-2">
                            <span>I would to create a new company, please!</span>
                            <Link href="/signinAdmin" className={styles.linkToRegister}>
                                Let's go!!
                            </Link>
                        </div>

                    }
                </div>
            </div>

        </div >
    )
}
