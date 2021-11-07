import Router from 'next/router'
import { useContext } from 'react'
import UserContext from '../../context/user'

import styles from './login.module.css'

export default function Login() {
    const { login } = useContext(UserContext)

    function handleLogin() {
        const $email = document.getElementById('email')
        const $password = document.getElementById('password')
        // login({ name: "Santiago San Román", nick: "SantiSR" })
        console.log($email);
    }

    function handleCancel() {
        Router.back()
    }

    return (
        <div className="container">
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
                        <div className="hstack gap-3 justify-content-around">
                            <button onClick={handleLogin} className="btn btn-primary w-50">SignIn</button>
                            <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>

        </div>
    )
}
