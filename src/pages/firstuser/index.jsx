import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-hot-toast'

import UsersContext from 'src/contexts/users.context'
import FirstuserHTML from './FirstuserHTML'

export default function FirstUser() {
    const { isFirstUser, createUser, updateUsersInfo } = useContext(UsersContext)
    const router = useRouter()

    useEffect(async () => {
        await updateUsersInfo()
        !isFirstUser && router.replace("/")
    }, [])

    async function handleCreateAdmin(data) {
        // const {
        //     email,
        //     password,
        //     password2,
        //     fullName,
        //     nick,
        //     isAdmin
        // } = getUserDataFromInputs()
        // const companyData = getCompanyDataFromInputs()

        // if (!email || !password || !fullName) {
        //     toast.error("Email, FullName and Password are required!")
        //     return false
        // }
        // if (password !== password2) {
        //     toast.error("Passwords don't match, please check!!")
        //     return false
        // }

        console.log("Obj. de campos: ", data);

        // Llamamos al servicio para crear el Admin & Company
        // const user = { email, password, fullName, nick }
        // const resp = await createUser(user, { isAdmin, isFirstUser })
        // // User created
        // if (resp.success) {
        //     toast.success(resp.message)
        //     router.replace("/")
        // } else {
        //     toast.error(resp.message)
        // }
    }


    return (<FirstuserHTML onSubmit={handleCreateAdmin} onCancel={() => router.replace("/")} />)
}
