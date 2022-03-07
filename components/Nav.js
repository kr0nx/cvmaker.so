import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

import { fireConfetti } from 'hooks/fireConfetti'
import { useStateValue } from 'context'
import { getEnvironment } from 'utils/getEnvironment'

import { DownloadModal } from './DownloadModal'

import { indigo, emerald, sky, pink } from 'tailwindcss/colors'
const yaml = `
---
title: "Resume"
author: "Didem"
slug: "resume"
date: "2020-08-01"
numbersections: false

---
`

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

const Nav = ({ sections }) => {
  const {
    state: { selectedSlugs, cvTheme },
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
    }, `\n\n`)

    if (option === 'markdown') {
      const a = document.createElement('a')
      const blob = new Blob([markdown], { type: 'text/plain;charset=utf-8' })
      a.href = URL.createObjectURL(blob)
      a.download = 'resume.md'
      a.click()

      fireConfetti()

      return
    }

    const { baseUrl, isProduction } = getEnvironment()

    const endpoint = `${baseUrl}/api/download`

    axios
      .post(endpoint, {
        markdown: markdown,
        downloadAs: option,
        theme: cvTheme
      })
      .then(({ data: { result } }) => {
        const a = document.createElement('a')

        if (option === 'pdf') {
          let buffer = new Uint8Array(result.data)
          const blob = new Blob([buffer], { type: 'application/pdf' })
          a.href = URL.createObjectURL(blob)
          a.download = `resume-${cvTheme}.pdf`
          a.click()
        } else if (option === 'html') {
          const blob = new Blob([result], { type: 'text/html' })
          a.href = URL.createObjectURL(blob)
          a.download = `resume-${cvTheme}.html`
          a.click()
        }

        fireConfetti()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const changeCvTheme = (theme) => {
    dispatch({ type: 'SET_THEME', theme })
  }

  return (
    <nav className="flex items-center justify-between w-full px-2 py-2">
      <Link href={'/'} passHref>
        <a className="flex-shrink-0 flex items-center ml-3 focus:outline-none focus:ring-fuchsia-400">
          <img src="logo.png" alt="cv logo" className="w-auto h-12" />
        </a>
      </Link>

      <div>
        <div className="p-4">
          <div className="flex space-x-4 items-center">
            <div className="group h-12">
              <button className="flex items-center px-6 py-[14px] text-sm font-semibold text-white uppercase rounded-md shado  bg-[#398cda] hover:bg-[#1d68af]">
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

            <button
              className="flex items-center px-6 py-3 space-x-2 text-sm font-semibold text-white uppercase rounded-md shado  bg-[#ff6cb6] hover:bg-[#e85aa1] "
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
