import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

import { fireConfetti } from 'hooks/fireConfetti'
import { useStateValue } from 'context'
import { getEnvironment } from 'utils/getEnvironment'

import { DownloadModal } from './DownloadModal'

const yaml = `
---
title: "Resume"
author: "Didem"
slug: "resume"
date: "2020-08-01"
numbersections: false

---
`

const Nav = ({ sections, toggleSidebar, openSidebar }) => {
  const {
    state: { selectedSlugs, cvTheme },
    dispatch
  } = useStateValue()

  const [showModal, setShowModal] = useState(false)

  const exportAsMarkdown = (markdown) => {
    const a = document.createElement('a')
    const blob = new Blob([markdown], { type: 'text/plain;charset=utf-8' })
    a.href = URL.createObjectURL(blob)
    a.download = 'resume.md'
    a.click()

    fireConfetti()

    return
  }

  const exportAsPdf = (markdown) => {
    const { baseUrl, isProduction } = getEnvironment()
    const endpoint = `/api/export/as_pdf`

    axios
      .post(endpoint, {
        markdown,
        theme: cvTheme
      })
      .then(({ data }) => {
        let buffer = new Uint8Array(data.buffer.data)
        const blob = new Blob([buffer], { type: 'application/pdf' })

        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `resume-${cvTheme}.pdf`
        a.click()

        fireConfetti()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const exportAsHtml = (markdown) => {
    const { baseUrl, isProduction } = getEnvironment()
    const endpoint = `/api/export/as_html`

    axios
      .post(endpoint, {
        markdown,
        theme: cvTheme
      })
      .then(({ data }) => {
        const blob = new Blob([data.content], { type: 'text/html' })

        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `resume-${cvTheme}.html`
        a.click()

        fireConfetti()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const download = (option) => {
    const markdown = selectedSlugs.reduce((acc, slug) => {
      const template = sections.find((s) => s.slug === slug)
      if (template) {
        return `${acc}${template.markdown}` + '\n\n'
      } else {
        return acc
      }
    }, `\n\n`)

    if (option === 'markdown') {
      exportAsMarkdown(markdown)
    }

    if (option === 'html') {
      exportAsHtml(markdown)
    }

    if (option === 'pdf') {
      exportAsPdf(markdown)
    }
  }

  return (
    <nav className="flex items-center justify-between w-full px-2 py-4">
      <Link href={'/'} passHref>
        <a className="flex-shrink-0 flex items-center -ml-3 -mt-1 sm:ml-3 sm:mt-0 focus:outline-none focus:ring-fuchsia-400">
          <img src="logo.png" alt="cv logo" className="w-auto h-12" />
        </a>
      </Link>

      <div className="flex items-center space-x-4">
        <button
          className="flex items-center px-2 py-2 md:px-6 md:py-2 space-x-2 text-sm font-semibold text-white uppercase rounded-md shadow  bg-[#ee6cff] hover:bg-[#e85aa1] "
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
          <span className="hidden sm:block">Download</span>
        </button>

        <button
          className="md:hidden flex items-center px-2 py-2 text-sm font-semibold text-white rounded-md shadow  bg-indigo-600 hover:bg-indigo-500 "
          onClick={toggleSidebar}
        >
          {openSidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {showModal && <DownloadModal setShowModal={setShowModal} download={download} />}
    </nav>
  )
}

export default Nav
