import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-hot-toast'

import UsersContext from 'src/contexts/users.context'

export default function FirstUser() {
    const { isFirstUser, createUser, updateUsersInfo } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        await updateUsersInfo()
        console.log("isFirstUser", isFirstUser);
        !isFirstUser && router.replace("/")
    }, [])

    function getDataFromInputs() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const password2 = document.getElementById('password2').value
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value
        const isAdmin = isFirstUser

        return {
            email,
            password,
            password2,
            fullName,
            nick,
            isAdmin
        }
    }

    async function handleNewUser() {
        const { email, password, password2, fullName, nick, isAdmin } = getDataFromInputs()


        if (!email || !password || !fullName) {
            toast.error("Email, FullName and Password are required!")
            return false
        }
        if (password !== password2) {
            toast.error("Passwords don't match, please check!!")
            return false
        }

        // Llamamos al servicio para crear el Admin & Company
        const user = { email, password, fullName, nick }
        const resp = await createUser(user, { isAdmin, isFirstUser })
        // User created
        if (resp.success) {
            toast.success(resp.message)
            router.replace("/")
        } else {
            toast.error(resp.message)
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
                {/* <h3>Create a new user</h3> */}
                <h3 className="fst-italic">· Main Administrator ·</h3>
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

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password"
                                    className="form-control"
                                    placeholder="Password" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Repeat Password</label>
                                <input type="password" id="password2"
                                    className="form-control"
                                    placeholder="Repeat password" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                id="roleAdmin"
                                defaultChecked={isFirstUser}
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
                    >Add me!
                    </button>
                    <button onClick={() => router.replace("/")} className="btn btn-secondary w-25">Go back</button>
                </div>
            </div>
        </div >
    )
}
