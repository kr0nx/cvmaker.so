import Link from 'next/link'
import axios from 'axios'

import { useStateValue } from 'context'

const Nav = ({ sections }) => {
  const {
    state: { selectedSlugs },
    dispatch
  } = useStateValue()

  const downloadHtml = () => {
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
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <nav className="flex justify-between py-2 px-4 items-center w-full">
      <Link href={'/'} passHref>
        <a className="focus:outline-none focus:ring-fuchsia-400 flex items-center ml-3">
          <img src="cv.svg" alt="cv logo" className="w-auto h-12" />
        </a>
      </Link>

      <div>
        <div className="p-4">
          <div className="group relative">
            <button className="flex items-center space-x-2  bg-purple-700 font-semibold uppercase text-white text-sm px-6 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            <nav
              tabIndex="0"
              className="overflow-hidden border-2 bg-gray-100 invisible border-gray-800 rounded-md w-full absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
            >
              <ul>
                <li>
                  <a href="#" className="block px-4 py-1 hover:bg-gray-200 " onClick={downloadHtml}>
                    HTML5
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-1 hover:bg-gray-200">
                    PDF
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-1 hover:bg-gray-200">
                    DOCX
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
