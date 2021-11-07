import { useContext } from 'react'
import Link from 'next/dist/client/link'
import UserContext from '../../context/user'

import styles from './login.module.css'

export default function Login() {
    const { login } = useContext(UserContext)

    function handleLogin() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        // login({ name: "Santiago San Román", nick: "SantiSR" })

        if (!login({ email, password })) {
            console.log("Error en autenticación");
        }

    }


    return (
        <div className={styles.card}>
            <div className="card-header">
                <h3 className="text-center">Sign In</h3>
            </div>
            <div className="card-body">
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">User email</label>
                        <input type="email" id="email"
                            className="form-control"
                            placeholder="Type your registered email" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"
                            className="form-control"
                            placeholder="Password" />
                    </div>
                    <div className="vstack gap-3">
                        <Link href="/">
                            <button onClick={handleLogin} className="btn btn-primary w-50 mx-auto">SignIn</button>
                        </Link>
                        <Link href="/">
                            <p className="text-info">I'm new here. <a >Please send me to register </a></p>


                        </Link>
                    </div>
                </form>
            </div>
        </div>

    )
}