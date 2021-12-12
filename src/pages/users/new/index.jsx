import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import UsersContext from '@Context/users.context'
import Profile from '@Components/pages/profileHTML'

export default function NewUser() {
    const { users, isFirstUser, createUser } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        // await updateUsersInfo()
        isFirstUser && router.replace("/")
    }, [])

    async function handleCreateUser({ user }) {
        const { email } = user
        const usersFound = users.filter(user => user.email === email)
        if (usersFound.length) {
            toast.error("This email already exists!")
            return
        }
        // Llamamos al servicio para crear el nuevo usuario
        const resp = await createUser(user, { isAdmin: false, isFirstUser: false })
        // User created
        if (resp.success) {
            toast.success(resp.message)
            router.back()
        } else {
            toast.error(resp.message)
        }
    }

    function handleCancel(e) {
        e.preventDefault()
        router.back()
    }


    return (
        <Profile
            onSubmit={handleCreateUser}
            onCancel={handleCancel}
            isNewUser={true}
        />
    )
}
