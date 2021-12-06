import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'


import UsersContext from '@Context/users.context'
import FirstuserHTML from '@Components/pages/FirstuserHTML'

export default function FirstUser() {
    const { isFirstUser, createMainAdmin, updateUsersInfo } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        await updateUsersInfo()
        !isFirstUser && router.replace("/")
    }, [])

    async function handleCreateAdmin({ user, company }) {

        // Llamamos al servicio para crear el Admin & Company
        const resp = await createMainAdmin(user, company)
        // MainAdmin creado correctamente
        if (resp.success) {
            toast.success(resp.message)
            router.replace("/")
        } else toast.error(resp.message)
    }


    return (<FirstuserHTML onSubmit={handleCreateAdmin} onCancel={() => router.replace("/")} />)
}
