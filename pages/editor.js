import Head from 'next/head'
import { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import sectionsWithLocales from 'sections/index'

import Nav from 'components/Nav'
import SectionSide from 'components/SectionSide'
import MdEditor from 'components/MdEditor'

import { useStateValue } from 'context'

export default function Editor({ sections }) {
  const { state, dispatch } = useStateValue()

  useEffect(() => {
    dispatch({
      type: 'SET_SECTIONS',
      sections
    })
  }, [dispatch, sections])

  useEffect(() => {
    dispatch({ type: 'ADD_SECTION', slug: 'title-and-description' })
  }, [dispatch])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        ></link>

        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="codewithdidem"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#FFDD00"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
      </Head>
      <div className="w-full h-full overflow-hidden fixed bg-[#100f0f]">
        <Nav />

        <div className="flex flex-1 space-x-10 w-full md:px-6 md:pt-4  h-full">
          <SectionSide />

          <div className="w-full md:w-1/2 full-screen ">
            <MdEditor />
          </div>

          <div className="w-80 flex-shrink-0 ">
            <h1>Side</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  const sections = sectionsWithLocales[locale] || sectionsWithLocales['en_EN']

  return {
    props: {
      sections,
      ...(await serverSideTranslations(locale, ['common', 'editor']))
    }
  }
}
