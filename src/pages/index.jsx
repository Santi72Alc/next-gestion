import Router from 'next/router';
import { useContext, useEffect, useState } from 'react'

import authContext from '@Context/auth.context';

const Home = () => {
  const { isLogged } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])

  useEffect(() => {
    isLogged
      ? setIsLoading(false)
      : Router.replace('/login')
  }, [isLogged])

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