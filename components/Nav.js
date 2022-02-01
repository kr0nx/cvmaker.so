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
      const template = sections.find(s => s.slug === slug)
      if (template) {
        return `${acc}${template.markdown}`
      } else {
        return acc
      }
    }, ``)

    const dev = process.env.NODE_ENV === 'development'
    const server = dev
      ? 'https://cv-builder-codingwithdidem.vercel.app'
      : 'https://cv-builder-steel.vercel.app/'

    axios
      .post(
        `${server}/api/resume/to-html`,
        {
          markdown: markdown.toString()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(({ data }) => {
        const a = document.createElement('a')
        const blob = new Blob([data.result])
        a.href = URL.createObjectURL(blob)
        a.download = 'resume.html'
        a.click()
      })
      .catch(err => {
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
        <button
          className="bg-baby-blue-eyes px-4 py-2 rounded-md text-sm font-semibold"
          onClick={downloadHtml}
        >
          Convert to HTML5
        </button>
      </div>
    </nav>
  )
}

export default Nav
