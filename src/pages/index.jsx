import Router from 'next/router';
import { useContext, useEffect, useState } from 'react'

import AuthContext from 'src/contexts/auth.context';
import UsersContext from 'src/contexts/users.context';

const Home = () => {
  const { isLogged } = useContext(AuthContext)
  const { isFirstUser, usersCount, updateUsersInfo } = useContext(UsersContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])

  useEffect(() => {
    usersCount || updateUsersInfo()
    if (usersCount === 0) {
      Router.replace('/signup')
    } else {
      if (!isLogged) Router.replace("login")
      else {
        setIsLoading(false)
        Router.replace("/")
      }
    }
  }, [isLogged, usersCount])

  return (
    <>
      {
        isLoading
          ?
          <h3 className="text-center">Redirecting</h3>
          :
          <h3 className="text-center">Página principal</h3>
      }
    </>
  )
}


export default Home;