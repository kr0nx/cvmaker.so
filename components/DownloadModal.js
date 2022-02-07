import { useTranslation } from 'next-i18next'

export const DownloadModal = ({ setShowModal, download }) => {
  const { t } = useTranslation('editor')

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
          <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-black sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 md:max-w-lg md:py-10 md:px-10">
            <div>
              <p className="mb-6 text-center text-7xl">🥳</p>
              <p className="mt-6 mb-4 font-sans text-3xl font-semibold leading-4 text-center text-gray-700 uppercase">
                {' '}
                Your{' '}
                <span className="font-semibold text-transparent bg-gradient-to-br from-pink-500 to-indigo-600 bg-clip-text">
                  resume
                </span>{' '}
                is ready
              </p>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="mb-4 text-lg font-medium leading-6 text-gray-600 dark:text-gray-300"
                  id="modal-title"
                >
                  You can download your resume using below links.
                </h3>
                <div className="mt-6">
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
      </div>
    </>
  )
}
