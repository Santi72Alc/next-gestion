import Router from 'next/router'
import { useContext } from 'react'
import UserContext from '../../context/user'

// import styles from './new-user.module.css'

export default function NewUser() {
    const { login } = useContext(UserContext)

    function handleNewUser() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value

        const body = { email, password, fullName, nick}

        alert("Datos introducidos: ", JSON.stringify(body))
    }


    function handleInputEmail(event) {
        const $nickname = document.getElementById('nick')
        const email = event.target.value
        $nickname.value = email.split('@')[0]
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Sign up</h3>
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
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"
                            className="form-control"
                            placeholder="Password" />
                    </div>
                    <div className="hstack gap-3">
                        <div className="form-group">
                            <label htmlFor="fullName">User full name</label>
                            <input type="fullName" id="fullName"
                                className="form-control"
                                placeholder="Type your name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nick">Nick</label>
                            <input type="nick" id="nick"
                                className="form-control"
                                placeholder="Type your nick" />
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer p-4">
                <div className="hstack gap-3">
                    <button onClick={handleNewUser} className="btn btn-primary w-75">New user</button>
                    <button onClick={() => Router.back()} className="btn btn-secondary w-25">Go back</button>
                </div>
            </div>
        </div>

    )
}
