import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import AuthContext from 'src/contexts/auth.context'
import UsersContext from 'src/contexts/users.context'

import { ToastError, ToastSuccess } from '@Libs/alerts'

// import styles from './login.module.css'

export default function Login() {
    const { login } = useContext(AuthContext)
    const { isFirstUser, usersCount, updateUsersInfo } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        isFirstUser && router.replace("/signup")
    }, [])

    async function handleLogin() {
        const $email = document.getElementById('email')
        const $password = document.getElementById('password')
        // const keepAlive = document.getElementById('keepAlive').checked

        const resp = await login($email.value, $password.value)

        if (resp.success) {
            ToastSuccess.fire({
                titleText: resp.message
            })
            router.replace("/")
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
                <h3 className="text-center">Login Page</h3>
            </div>

            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                </div>
            </div>

        </div >
    )
}
