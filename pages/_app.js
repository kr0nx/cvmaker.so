import { appWithTranslation } from 'next-i18next'
import NextNProgress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextNProgress height={3} color={'#ffafccff'} />
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
