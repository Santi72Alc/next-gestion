import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastError, ToastSuccess } from "@Libs/alerts"

import AuthContext from 'src/contexts/auth.context'
import UsersContext from 'src/contexts/users.context'

import { ROLES } from '@Services/constants'

// import styles from './new-user.module.css'
export default function SignUp() {
    const { user, isLogged } = useContext(AuthContext)
    const { isFirstUser, createUser } = useContext(UsersContext)
    const router = useRouter()

    async function handleNewUser() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value
        const isAdmin = isFirstUser || document.getElementById('roleAdmin').checked

        // Llamamos al servicio para crear el Admin & Company
        const user = { email, password, fullName, nick }
        const resp = await createUser({ user }, { isAdmin, isFirstUser })
        // User created
        if (resp.success) {
            ToastSuccess.fire({ titleText: resp.message })
            router.replace("/")
        } else {
            ToastError.fire({ titleText: resp.message })
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
                <h3>Create a new user</h3>
                <h5 className="fst-italic">· Main Administrator ·</h5>
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
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="fullName">User full name</label>
                                <input type="fullName" id="fullName"
                                    className="form-control"
                                    placeholder="Type your name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="nick">Nick</label>
                                <input type="nick" id="nick"
                                    className="form-control"
                                    placeholder="Type your nick" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                id="roleAdmin"
                                defaultChecked={isFirstUser}
                                hidden={!isFirstUser}
                                disabled={isFirstUser}
                            />
                            <label className="form-checkbox-label text-danger" htmlFor="roleAdmin">
                                {isFirstUser ? 'MAIN ADMINISTRATOR ' : 'Administrator '}
                            </label>
                        </div>
                    </div>
                </form>
            </div >
            <div className="card-footer p-4">
                <div className="hstack gap-3">
                    <button
                        onClick={handleNewUser}
                        className="btn btn-primary w-75"
                        disabled={(!isLogged || user.role !== ROLES.MainAdmin) && !isFirstUser}
                    >Add me!
                    </button>
                    <button onClick={() => router.back()} className="btn btn-secondary w-25">Go back</button>
                </div>
            </div>
        </div >
    )
}
