import { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'

/**
 *  CSS imports
 */ 
// bootstrap CSS theme
import '../libs/themes/darkly/bootstrap.min.css'

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

        <title>Budget Management</title>
      </Head>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </>
  )
}

export default MyApp