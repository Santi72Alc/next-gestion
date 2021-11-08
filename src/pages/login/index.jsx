import Router from 'next/router'
import { useContext } from 'react'
import Link from '../../components/link'
import UserContext from '../../context/user'

import styles from './login.module.css'

export default function Login() {
    const { login } = useContext(UserContext)

    function handleLogin() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        // login({ name: "Santiago San Román", nick: "SantiSR" })

        const isLogged = login({ email, password })
        console.log('isLogged :>> ', isLogged);
        if (isLogged) Router.push("/")
        else console.log("Error en autenticación");
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
                </form>
            </div>

            <div className="card-footer p-4">
                <div className="vstack gap-2">
                    <button onClick={handleLogin} className="btn btn-primary w-50 mx-auto">I'm ready</button>
                    <Link href="/signup" className={`text-muted text-center ${styles.linkToRegister}`}>
                        I'm new here. Please, send me to register
                    </Link>
                </div>
            </div>

        </div>

    )
}
