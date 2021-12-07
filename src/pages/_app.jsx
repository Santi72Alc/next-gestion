import router from 'next/router'
import { useContext, useEffect } from 'react'

import Head from 'next/head'
import Navbar from '@Components/navbar'

import { LayoutProvidersContext } from 'src/context/layout.context'

import ActualUserContext from '@Context/actualUser.context'

/**
 *  CSS imports
 */
// bootstrap CSS theme
import '@Libs/themes/spacelab/bootstrap.min.css'

// global CSS
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { isLogged } = useContext(ActualUserContext)

  useEffect(() => {
    !isLogged && router.replace("/")
  }, [])

  return (
    <>
      <Head>
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css" />

        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous" /> */}
        {/* <link
          rel="stylesheet"
          href="/src/libs/themes/spacelab/bootstrap.min.css" /> */}
        <title>Budgets Management</title>
      </Head>
      <LayoutProvidersContext>
        <Navbar>
          <Component {...pageProps}/>
        </Navbar>
      </LayoutProvidersContext>
      {/* <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous">
      </script> */}

    </>
  )
}

export default MyApp
