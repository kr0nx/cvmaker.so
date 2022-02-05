import path from 'path'
import { spawn } from 'child_process'
import getConfig from 'next/config'
var optipng = require('pandoc-bin').path

import { useEnvironment } from 'utils/useEnvironment'

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

const getCssPath = () => {
  const { baseUrl, isProduction } = useEnvironment()

  return isProduction
    ? `${baseUrl}/resume-css-stylesheet.css`
    : serverPath('public/resume-css-stylesheet.css')
}

const buildDownloadArgs = (downloadAs) => {
  const cssPath = getCssPath()

  const defaultArgs = [
    '-f',
    'markdown+tex_math_single_backslash+tex_math_dollars',
    // `--css=${cssPath}`,
    '--toc',
    // '--mathjax',
    '--standalone'
    // '-o',
    // 'build/resumeee.pdf'
  ]

  switch (downloadAs) {
    case 'html5':
      return ['-t', 'html5', ...defaultArgs]
    case 'pdf':
      return ['--latex-engine', 'xelatex', ...defaultArgs]
    case 'docx':
      return ['-t', 'docx', ...defaultArgs]
  }
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown, downloadAs } = req.body

    // Based on downloadAs option build the pandoc args
    const args = buildDownloadArgs(downloadAs)

    var child = spawn(optipng, [...args])

    child.stdin.write(markdown)

    child.stdout.on('data', function (data) {
      res.status(200).json({ data: data.toString() })
    })
    child.stderr.on('data', function (data) {
      res.status(500).json({ error: data.toString() })
    })
    child.stdin.end()
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
