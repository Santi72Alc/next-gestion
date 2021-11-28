import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-hot-toast'

import AuthContext from '@Context/auth.context_NOUSAR'
import UsersContext from 'src/contexts/users.context'

export default function Profile() {
    const { updateUser } = useContext(UsersContext)
    const { user, isLogged, isAdmin, setActualUser } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        setUserData(user)
    }, [])


    function setUserData({ email, fullName, nick }) {
        document.getElementById('email').value = email
        document.getElementById('fullName').value = fullName
        document.getElementById('nick').value = nick
    }

    async function handleUpdateUser() {
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value

        const newUser = {
            _id: user._id,
            fullName,
            nick
        }
        const { data } = await updateUser({ user: { ...newUser } })
        if (data.success) {
            setActualUser(data.data)
            toast.success(data.message)
        } else
            toast.error(data.message)
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3>Profile</h3>
                <h5 className="fst-italic">· {user.role} ·</h5>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">User email</label>
                        <input type="email" id="email"
                            className="form-control"
                            disabled
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

                </form>
            </div >
            <div className="card-footer p-4">
                <div className="hstack gap-3">
                    <button
                        onClick={handleUpdateUser}
                        className="btn btn-primary w-75"
                        disabled={!isLogged || !isAdmin}
                    >Save data
                    </button>
                    <button onClick={() => router.back()} className="btn btn-secondary w-25">Go back</button>
                </div>
            </div>
        </div >
    )
}
