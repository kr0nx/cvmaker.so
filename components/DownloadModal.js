import { useTranslation } from 'next-i18next'
import { useStateValue } from 'context'
import { indigo, emerald, sky, pink } from 'tailwindcss/colors'

const supportedThemes = [
  {
    name: 'default',
    color: indigo[500]
  },
  {
    name: 'air',
    color: emerald[500]
  },
  {
    name: 'retro',
    color: sky[500]
  },
  {
    name: 'splendor',
    color: pink[500]
  }
]

export const DownloadModal = ({ setShowModal, download }) => {
  const { t } = useTranslation('editor')

  const {
    state: { cvTheme },
    dispatch
  } = useStateValue()

  const changeCvTheme = (theme) => {
    dispatch({ type: 'SET_THEME', theme })
  }

  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/*
Background overlay, show/hide based on modal state.
Entering: "ease-out duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in duration-200"
  From: "opacity-100"
  To: "opacity-0"
    */}
          <div
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            role="overlay"
            aria-hidden="true"
            onClick={() => setShowModal(false)}
          />
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            ​
          </span>
          {/*
Modal panel, show/hide based on modal state.
Entering: "ease-out duration-300"
  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
  From: "opacity-100 translate-y-0 sm:scale-100"
  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    */}
          <div className="text-center inline-block px-4 pt-5 pb-4 overflow-hidden align-bottom transition-all transform bg-white rounded-lg shadow-xl  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 md:max-w-lg md:py-10 md:px-10">
            <div>
              <p className="mb-6 text-center text-7xl">🥳</p>
              <p className="mt-6 mb-4 font-sans text-3xl font-semibold leading-4 text-center text-gray-800 uppercase">
                {' '}
                Your <span className="font-semibold text-black ">resume</span> is ready
              </p>

              <div className="group h-10 z-10 mb-20 mt-10">
                <p className="uppercase mb-2 font-bold text-gray-800">Select a theme</p>
                <button className="w-full flex items-center justify-center px-6 py-[10px] text-sm font-semibold text-white uppercase rounded-md shado  bg-black">
                  <span>{cvTheme}</span>
                </button>

                <nav
                  tabIndex="0"
                  className="invisible w-full overflow-hidden transition-all bg-gray-100 border-2 border-gray-800 rounded-md opacity-0 top-full group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
                >
                  <ul>
                    {supportedThemes.map(({ name, color }) => (
                      <li key={name}>
                        <a
                          href={'#'}
                          className={`block px-4 py-1  hover:bg-gray-200`}
                          onClick={() => changeCvTheme(name)}
                        >
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="mt-8">
                <p className="uppercase mb-2 font-bold text-gray-800">Download Resume</p>
                <button
                  className="w-full py-3 mt-2 mb-2 text-white rounded-md bg-fuchsia-500 hover:bg-fuchsia-400"
                  onClick={() => download('markdown')}
                >
                  MARKDOWN
                </button>
                <button
                  className="w-full py-3 mt-2 mb-2 text-white bg-pink-500 rounded-md hover:bg-pink-400"
                  onClick={() => download('html')}
                >
                  HTML5
                </button>
                <button
                  className="w-full py-3 mt-2 mb-2 text-white rounded-md bg-emerald-500 hover:bg-emerald-400"
                  onClick={() => download('pdf')}
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
