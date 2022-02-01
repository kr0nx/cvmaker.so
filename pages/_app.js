import { appWithTranslation } from 'next-i18next'
import NextNProgress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'

import { StateProvider } from 'context'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextNProgress height={4} color={'#ffafccff'} />
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
