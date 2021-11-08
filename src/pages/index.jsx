import Router from 'next/router';
import { useContext, useEffect} from 'react'

import UserContext from '../context/user';

export default function Home() {
  const { isLoggedIn } = useContext(UserContext);

  useEffect( () => {
    if (!isLoggedIn) Router.replace("/login")
  })

  return (
    <>
      <h3 className="text-center">Página principal</h3>
    </>
  )
}
