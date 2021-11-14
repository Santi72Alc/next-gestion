import { useContext } from 'react'
import Router from 'next/router'
import myAlerts from "@Libs/alerts"
import UserContext from '@Context/user'
import usersServices from '@Services/users.services'

// import styles from './new-user.module.css'
function NewUser() {
    const { isFirstUser, setIsFirstUser } = useContext(UserContext)

    async function handleNewUser() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value
        const isAdmin = document.getElementById('roleAdmin').checked

        // Llamamos al servicio para crear el usuario
        const userToCreate = { email, password, fullName, nick, role: usersServices.setRoleName({ isAdmin, isFirstUser }) }
        const resp = await usersServices.createUser(userToCreate)

        // User created
        if (resp.success) {
            myAlerts.ToastSucces.fire({ titleText: resp.message })
            setIsFirstUser(false)
            Router.replace("/")
        } else {
            myAlerts.ToasError.fire({ titleText: resp.message })
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
                <h3>Sign up</h3>
                {isFirstUser && <h4 className="fst-italic">· Main Administrator ·</h4>}
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
                                defaultChecked={isFirstUser || false}
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
                <div className={isFirstUser ? "d-flex justify-content-center" : "hstack gap-3"}>
                    <button onClick={handleNewUser} className="btn btn-primary w-75">Add me!</button>
                    {!isFirstUser &&
                        <button onClick={() => Router.back()} className="btn btn-secondary w-25">Go back</button>
                    }
                </div>
            </div>
        </div >

    )
}

export default NewUser