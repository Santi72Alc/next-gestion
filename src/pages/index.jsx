import Router from 'next/router';
import { useContext, useEffect, useState } from 'react'

import AuthContext from 'src/contexts/auth.context';
import UsersContext from 'src/contexts/users.context';

const Home = () => {
  const { isLogged } = useContext(AuthContext)
  const { usersCount, updateUsersInfo } = useContext(UsersContext)
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap")
  // }, [])

  useEffect(() => {
    // ! Mirar de quitar los accesos automáticos y poner
    // ! sobre un botón en navbar
    // TODO poner boto en navbar pricipal para hacer login
    updateUsersInfo()
    setIsLoading(false)
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