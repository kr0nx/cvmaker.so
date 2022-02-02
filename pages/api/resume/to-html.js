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

    const cssPath = serverPath('public/resume-css-stylesheet.css')

    var child = spawn('optipng', [
      '-s',
      '--toc',
      '--from=markdown_github',
      '--to=html',
      `--css=${cssPath}`
    ])
    child.stdin.write(markdown)
    child.stdout.on('data', function (data) {
      res.status(200).json({ data: data.toString() })
    })
    child.stdin.end()
  }
}
