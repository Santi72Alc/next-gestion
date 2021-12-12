import { useContext } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import UsersContext from '@Context/users.context'
import ActualUserContext from '@Context/actualUser.context'

// Components to show (depending of user)
import FirstuserHTML from '@Components/pages/FirstuserHTML'
import ProfileHTML from '@Components/pages/profileHTML'

export default function Profile() {
    const { isFirstUser, updateUser, createMainAdmin } = useContext(UsersContext)
    const { user, keepAlive, setActualUser } = useContext(ActualUserContext)
    const router = useRouter()

    async function handleCreateAdmin({ user, company }) {
        // Llamamos al servicio para crear el Admin & Company
        const resp = await createMainAdmin(user, company)

        if (resp.success) toast.success(resp.message)
        else toast.error(resp.message)
        router.replace("/")
    }

    async function handleUpdateUser({ user }) {
        const { _id, fullName, email, nick } = user

        if (!fullName) {
            toast.error("Full Name is required!!")
            return false
        }
        const newUser = {
            _id,
            fullName,
            email,      // NO es modificable pero se envia para NO errores
            nick
        }
        const { data } = await updateUser({ user: { ...newUser, keepAlive } })
        if (data.success) {
            console.log("Actualizo ", data.data, keepAlive);
            setActualUser({keepAlive, ...data.data})
            toast.success(data.message)
            router.push("/")
        } else
            toast.error(data.message)
    }

    const ComponentFirstuser = <FirstuserHTML onSubmit={handleCreateAdmin} onCancel={() => router.replace("/")} />
    const ComponentNormalProfile = <ProfileHTML onSubmit={handleUpdateUser} onCancel={() => router.back()} data={user} />
    const ComponentToShow = isFirstUser ? ComponentFirstuser : ComponentNormalProfile
    return (ComponentToShow)
}
