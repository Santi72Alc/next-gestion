import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import LoginHTML from './LoginHTML'

// import AuthContext from 'src/contexts/auth.context'
import ActualUserContext from '@Context/actualUser.context'
import UsersContext from 'src/contexts/users.context'

export default function Login() {
    const { login, getActualUser } = useContext(ActualUserContext)
    const { isFirstUser } = useContext(UsersContext)
    const router = useRouter()

    useEffect(() => {
        isFirstUser && router.replace("/firstuser")
        fillData()
    }, [])


    function fillData() {
        const { isLogged, keepAlive, user } = getActualUser()

        if (isLogged) {
            document.getElementById('email').value = user.email
            document.getElementById('password').value = user.$password
            document.getElementById('keepAlive').checked = keepAlive
        }
    }

    async function handleLogin({ email, password, keepAlive }) {

        const resp = await login(email, password, keepAlive)

        if (resp.success) {
            toast.success(resp.message)
            router.replace("/")
        }
        else {
            toast.error(resp.message)
        }
    }

    return (
        <LoginHTML
            onSubmit={handleLogin}
            onCancel={() => router.replace("/")} />
    )
}
