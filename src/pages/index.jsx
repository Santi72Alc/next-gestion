import Router from 'next/router';
import { useContext, useEffect, useState } from 'react'

import UserContext from '@Context/user';
import { isLogged } from "@Services/sessionStorage.services"

const Home = () => {
  const { isLoggedIn, isFirstUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isFirstUser) Router.replace("/signup")
    else {
      if (isLogged()) {
        setIsLoading(false)
      } else Router.replace('/login')
    }
  }, [isFirstUser, isLoggedIn])

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