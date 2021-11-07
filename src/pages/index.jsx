import { useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import UserContext from '../context/user';
import Login from '../components/login';



export default function Home() {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter()

  return (
    <>
      {!isLoggedIn && <Login />}
      <h3 className="text-center">Página principal</h3>
    </>
  )
}
