import path from 'path'
import { spawn } from 'child_process'
import getConfig from 'next/config'

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown } = req.body

    const cssPath = serverPath('public/resume-css-stylesheet.css')

    var child = spawn(`pandoc`, [
      '-f',
      'markdown+tex_math_single_backslash+tex_math_dollars',
      '-t',
      'html5',
      `--css=${cssPath}`,
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
  }
}
