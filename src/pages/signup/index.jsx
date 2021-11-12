import { useContext } from 'react'
import Router from 'next/router'
import myAlerts from "@Libs/alerts"
import UserContext from '@Context/user'

// import styles from './new-user.module.css'

export default function NewUser() {
    const {  createUser, isFirstUser, isRootAdmin } = useContext(UserContext)

    async function handleNewUser() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value
        const isAdmin = document.getElementById('roleAdmin').checked

        // Setting the user role
        console.log("Data introducida en front: ", { email, password, fullName, nick, isAdmin});

        const resp = await createUser({ email, password, fullName, nick, isAdmin })

        console.log("REspuesta de API: ", resp);
        if (resp.success) {
            myAlerts.ToastSucces.fire(resp.message)
            Router.replace("/")
        } else {
            myAlerts.ToasError.fire(resp.message)
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
                {isFirstUser && <h4 className="fst-italic">· Root Administrator ·</h4>}
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
                                checked={isRootAdmin}
                                hidden={!isRootAdmin}
                                disabled={isRootAdmin}
                            />
                            <label className="form-checkbox-label text-danger" htmlFor="roleAdmin">
                                {isFirstUser ? 'ROOT ADMINISTRATOR ' : 'Administrator '}
                            </label>
                        </div>
                    </div>
                </form>
            </div >
            <div className="card-footer p-4">
                <div className="hstack gap-3">
                    <button onClick={handleNewUser} className="btn btn-primary w-75">Add me!</button>
                    <button onClick={() => Router.back()} className="btn btn-secondary w-25">Go back</button>
                </div>
            </div>
        </div >

    )
}
