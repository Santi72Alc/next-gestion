import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-hot-toast'

import ActualUserContext from 'src/context/actualUser.context'
import UsersContext from 'src/context/users.context'
import { ROLES, initialUserProfile } from '@Services/constants'

export default function Profile() {
    const { updateUser, getUserById, updateUsersInfo } = useContext(UsersContext)
    const { user, setActualUser } = useContext(ActualUserContext)
    const router = useRouter()

    useEffect(async () => {
        toast.loading("Loading user...", { position: "top-center" })
        await updateUsersInfo()
        const userFound = getUserById(user._id)
        setUserDataToInputs(userFound)
        toast.dismiss()
    }, [])


    function setUserDataToInputs(user = initialUserProfile) {
        document.getElementById('email').value = user.email
        document.getElementById('fullName').value = user.fullName
        document.getElementById('nick').value = user.nick
    }

    async function handleUpdateUser() {
        const fullName = document.getElementById('fullName').value
        const nick = document.getElementById('nick').value

        if (!fullName) {
            toast.error("Full Name is required!!")
            return false
        }
        const newUser = {
            _id: user._id,
            fullName,
            nick
        }
        const { data } = await updateUser({ user: { ...newUser } })
        if (data.success) {
            setActualUser(data.data)
            router.push("/")
            toast.success(data.message)
        } else
            toast.error(data.message)
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3>Profile</h3>
                <h5 className="fst-italic">· {user?.role} ·</h5>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"
                            className="form-control"
                            disabled
                        />
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="fullName">Full name</label>
                                <input type="text" id="fullName"
                                    className="form-control"
                                    placeholder="Type your name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="nick">Nick</label>
                                <input type="text" id="nick"
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
                        className="btn btn-primary w-50"
                    >
                        Save
                    </button>
                    <button onClick={() => router.replace("/")} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div >
    )
}
