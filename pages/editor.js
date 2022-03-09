import Head from 'next/head'
import { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useHotkeys } from 'react-hotkeys-hook'
import sectionsWithLocales from 'sections/index'

import Nav from 'components/Nav'
import SectionSide from 'components/SectionSide'
import MdEditor from 'components/MdEditor/MdEditor'
import MdPreview from 'components/MdPreview'

import { useStateValue } from 'context'

export default function Editor({ templates }) {
  const { state, dispatch } = useStateValue()

  const [sections, setSections] = useState(templates)
  const [viewMode, setViewMode] = useState('markdown')

  useHotkeys('ctrl+m', () => {
    setViewMode('markdown')
  })

  useHotkeys('ctrl+p', () => {
    setViewMode('preview')
  })

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

  const toggleViewMode = () => {
    setViewMode(viewMode === 'markdown' ? 'preview' : 'markdown')
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

      <div className="fixed w-full h-full overflow-hidden bg-gradient-to-br bg-[#282a33]">
        <Nav sections={sections} />

        <div className="flex flex-1 w-full h-full space-x-4 mt-4 md:px-6">
          <SectionSide
            sections={sections}
            resetSections={resetSections}
            resetSection={resetSection}
          />

          <div
            className={`relative w-full overflow-auto h-[630px] ${
              viewMode === 'markdown' ? 'shadow-lg shadow-[#ffc8ddff]' : ''
            }  text-[#ffc8ddff]`}
          >
            <button
              className="absolute right-4 top-2 z-10 hover:text-[#d88ba9]"
              onClick={toggleViewMode}
            >
              {viewMode === 'markdown' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              )}
            </button>

            {viewMode === 'markdown' ? (
              <MdEditor sections={sections} updateSections={updateSections} />
            ) : (
              <MdPreview sections={sections} />
            )}
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
