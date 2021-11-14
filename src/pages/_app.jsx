import { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@Components/navbar'
import { UserProvider } from '@Context/user'

/**
 *  CSS imports
 */
// bootstrap CSS theme
import '@Libs/themes/spacelab/bootstrap.min.css'

// global CSS
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  }, [])

  return (
    <>
      <Head>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css" />

        <title>Budgets Management</title>
      </Head>
      <UserProvider>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </UserProvider>
    </>
  )
}

export default MyApp
