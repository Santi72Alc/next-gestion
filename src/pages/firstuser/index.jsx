import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'


import UsersContext from 'src/contexts/users.context'
import FirstuserHTML from '@Components/pages/FirstuserHTML'

export default function FirstUser() {
    const { isFirstUser, createUser, updateUsersInfo } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        await updateUsersInfo()
        !isFirstUser && router.replace("/")
    }, [])

    async function handleCreateAdmin({ user, company }) {

        // Llamamos al servicio para crear el Admin & Company
        const resp = await createUser(user, { isAdmin: true, isFirstUser: true })
        // User created
        if (resp.success) {
            toast.success(resp.message)
            router.replace("/")
        } else {
            toast.error(resp.message)
        }
    }


    return (<FirstuserHTML onSubmit={handleCreateAdmin} onCancel={() => router.replace("/")} />)
}
