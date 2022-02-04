import path from 'path'
import { spawn } from 'child_process'
import getConfig from 'next/config'
var optipng = require('pandoc-bin').path

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown } = req.body

    const devCssPath = serverPath('public/resume-css-stylesheet.css')
    const prodCssPath = 'https://cvmaker-so.vercel.app//resume-css-stylesheet.css'

    const dev = process.env.NODE_ENV === 'development'
    const cssLink = dev ? devCssPath : prodCssPath

    var child = spawn(optipng, [
      '-f',
      'markdown+tex_math_single_backslash+tex_math_dollars',
      '-t',
      'html5',
      `--css=${cssLink}`,
      '--toc',
      '--mathjax',
      '--standalone'
    ])

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
