import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import LanguagePicker from 'components/LanguagePicker'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  const { t } = useTranslation('common')
  return (
    <>
      <div className="bg-gray-900">
        <div className="relative pt-8 overflow-hidden">
          <div className="absolute inset-y-0 w-full h-full" aria-hidden="true">
            <div className="relative h-full">
              <svg
                className="absolute transform right-full translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full w-96 h-72"
                id="10015.io"
                viewBox="0 0 1200 630"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="83"
                    height="83"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(73, 73) rotate(0) skewX(0)"
                  >
                    <svg width="10" height="10" viewBox="0 0 100 100">
                      <g fill="#ffc8dd" opacity="1">
                        <circle cx="50" cy="50" r="50"></circle>
                      </g>
                    </svg>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="#111827"></rect>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
              </svg>

              <svg
                className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4 w-96 h-72"
                id="10015.io"
                viewBox="0 0 1200 630"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="pattern"
                    x="0"
                    y="0"
                    width="47"
                    height="47"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(37, 37) rotate(0) skewX(0)"
                  >
                    <svg width="10" height="10" viewBox="0 0 100 100">
                      <g fill="#9f3dd4" opacity="1">
                        <circle cx="50" cy="50" r="50"></circle>
                      </g>
                    </svg>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="#111827"></rect>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
              </svg>
            </div>
          </div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="mx-auto max-w-7xl sm:px-6">
              <nav className="relative flex items-center justify-between" aria-label="Global">
                <div>
                  <Link href="/">
                    <img
                      className="w-auto h-16 md:h-20 cursor-pointer object-cover flex-shrink-0"
                      src="logo.png"
                      alt="cv logo"
                      // style={{ height: '3rem' }}
                    />
                  </Link>
                </div>

                <div className="h-7 md:h-10">
                  <LanguagePicker />
                </div>
              </nav>
            </div>

            <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-br from-baby-blue-eyes to-fuchsia-600 bg-clip-text sm:text-5xl md:text-6xl">
                  <span className="block"> {t('common:title')}</span>
                  <span className="block text-fuchsia-600">{t('subtitle')}</span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  {t('common:description')}
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <div className="flex flex-col items-center">
                  <span className="inline-flex rounded-md shadow ">
                    <Link href="/editor" passHref>
                      <a className="uppercase inline-flex items-center px-4 py-2 font-medium text-xl bg-blue-500 hover:bg-blue-400 border border-transparent rounded-lg text-white w-[250px] h-[54px] justify-center">
                        {t('common:generate')}
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-full mt-16 mb-16">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="flex-1 w-full" />
            </div>
            <div className="relative max-w-4xl px-4 mx-auto bg-gray-900 sm:px-6">
              <div className="absolute top-0 rounded-full left-24 w-96 h-96 bg-fuchsia-300 mix-blend-normal filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 bg-green-300 rounded-full right-24 w-96 h-96 mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute bg-blue-300 rounded-full -bottom-16 left-64 w-96 h-96 mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <img
                className="relative rounded-lg shadow-lg opacity-90"
                src="/devresume.png"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
