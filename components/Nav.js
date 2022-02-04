import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

import { fireConfetti } from 'hooks/fireConfetti'
import { useStateValue } from 'context'

import { DownloadModal } from './DownloadModal'

const Nav = ({ sections }) => {
  const {
    state: { selectedSlugs },
    dispatch
  } = useStateValue()

  const [showModal, setShowModal] = useState(false)

  const download = (option) => {
    const markdown = selectedSlugs.reduce((acc, slug) => {
      const template = sections.find((s) => s.slug === slug)
      if (template) {
        return `${acc}${template.markdown}`
      } else {
        return acc
      }
    }, ``)

    const dev = process.env.NODE_ENV === 'development'
    const server = dev ? 'http://localhost:3000' : 'https://cv-builder-steel.vercel.app/'

    axios
      .post(`${server}/api/resume/to-html`, {
        markdown: markdown.toString()
      })
      .then(({ data }) => {
        const a = document.createElement('a')
        const blob = new Blob([data.data])
        a.href = URL.createObjectURL(blob)
        a.download = 'resume.html'
        a.click()

        fireConfetti()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <nav className="flex items-center justify-between w-full px-4 py-2">
      <Link href={'/'} passHref>
        <a className="flex items-center ml-3 focus:outline-none focus:ring-fuchsia-400">
          <img src="cv.svg" alt="cv logo" className="w-auto h-12" />
        </a>
      </Link>

      <div>
        <div className="p-4">
          <div className="relative group">
            <button
              className="flex items-center px-6 py-3 space-x-2 text-sm font-semibold text-white uppercase rounded-md shado bg-fuchsia-600 hover:bg-fuchsia-500"
              onClick={() => setShowModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {showModal && <DownloadModal setShowModal={setShowModal} download={download} />}
    </nav>
  )
}

export default Nav
