import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import LoginHTML from '@Components/pages/LoginHTML'

import ActualUserContext from 'src/context/actualUser.context'
import UsersContext from 'src/context/users.context'

export default function Login() {
    const { isLogged, login } = useContext(ActualUserContext)
    const { isFirstUser } = useContext(UsersContext)
    const router = useRouter()

    useEffect(() => {
        isFirstUser && router.replace("/profile")
        isLogged && router.replace("/")
    }, [isLogged, isFirstUser])

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
