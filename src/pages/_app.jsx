import { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@Components/navbar'
import LayoutProviders from '@Context/layout.context'
// import { AuthProvider } from '@Context/auth.context'
// import { UsersProvider } from '@Context/users.context'

/**
 *  CSS imports
 */
// bootstrap CSS theme
import '@Libs/themes/spacelab/bootstrap.min.css'

// global CSS
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css" />

        <title>Budgets Management</title>
      </Head>
      <LayoutProviders>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </LayoutProviders>
    </>
  )
}

export default MyApp
