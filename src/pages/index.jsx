import Router from 'next/router';
import { useContext, useEffect, useState } from 'react'

import UserContext from '../context/user';

const Home = () => {
  const { isLoggedIn, isFirstUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    isFirstUser
      ? Router.replace("/signup")
      : isLoggedIn
        ? setIsLoading(false)
        : Router.replace('/login')
  })

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