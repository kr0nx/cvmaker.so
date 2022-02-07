import Head from 'next/head'
import { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import sectionsWithLocales from 'sections/index'

import Nav from 'components/Nav'
import SectionSide from 'components/SectionSide'
import MdEditor from 'components/MdEditor/MdEditor'
import MdPreview from 'components/MdPreview'

import { useStateValue } from 'context'

export default function Editor({ templates }) {
  const { state, dispatch } = useStateValue()

  const [sections, setSections] = useState(templates)

  useEffect(() => {
    dispatch({
      type: 'INITIAL_SETUP',
      sections
    })
  }, [dispatch, templates])

  const updateSections = (newSections) => {
    setSections(newSections)
  }

  const resetSections = () => {
    setSections(templates)
  }

  const resetSection = (slug) => {
    const defaultSection = templates.find((s) => s.slug === slug)

    const newSections = sections.map((section) => {
      if (section.slug === slug) {
        return defaultSection
      } else {
        return section
      }
    })

    setSections(newSections)
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        ></link>
        <script
          data-name="BMC-Widget"
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

      <div className="fixed w-full h-full overflow-hidden bg-gradient-to-br bg-gray-800">
        <Nav sections={sections} />

        <div className="flex flex-1 w-full h-full space-x-4 md:px-6">
          <SectionSide
            sections={sections}
            resetSections={resetSections}
            resetSection={resetSection}
          />

          <div className="w-[580px] full-screen ">
            <MdEditor sections={sections} updateSections={updateSections} />
          </div>

          <div className="flex-1 flex-shrink-0 mt-4 ">
            <MdPreview sections={sections} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  const templates = sectionsWithLocales[locale] || sectionsWithLocales['en_EN']

  return {
    props: {
      templates,
      ...(await serverSideTranslations(locale, ['common', 'editor']))
    }
  }
}
