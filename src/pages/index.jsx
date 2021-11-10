import Router from 'next/router';
import { useContext, useEffect } from 'react'

import UserContext from '../context/user';

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    !isLoggedIn && Router.replace('/login')
  })

  return (
    <>
      <h3 className="text-center">Página principal</h3>
    </>
  )
}


export default Home;