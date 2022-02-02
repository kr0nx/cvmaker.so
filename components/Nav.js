import Link from 'next/link'
import axios from 'axios'

import { useStateValue } from 'context'

const Nav = () => {
  const {
    state: { sections, selectedSlugs },
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
    <nav className="flex justify-between p-4 items-center w-full">
      <Link href={'/'} passHref>
        <a className="focus:outline-none focus:ring-fuchsia-400 flex items-center ml-3">
          <img src="cv.svg" alt="cv logo" className="w-auto h-12" />
        </a>
      </Link>

      <div>
        <div class="p-4">
          <div class="group relative">
            <button class="border-2 border-baby-blue-eyes font-semibold uppercase text-baby-blue-eyes text-sm px-6 py-2 rounded-md">
              Download
            </button>
            <nav
              tabindex="0"
              class="overflow-hidden border-2 bg-gray-100 invisible border-gray-800 rounded-md w-full absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
            >
              <ul>
                <li>
                  <a href="#" class="block px-4 py-1 hover:bg-gray-200 " onClick={downloadHtml}>
                    HTML5
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-1 hover:bg-gray-200">
                    PDF
                  </a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-1 hover:bg-gray-200">
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
