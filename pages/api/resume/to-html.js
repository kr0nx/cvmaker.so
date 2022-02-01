import path from 'path'
import getConfig from 'next/config'
import nodePandoc from 'node-pandoc'
const { spawn } = require('child_process')

const serverPath = staticFilePath => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default async (req, res) => {
  if (req.method === 'POST') {
    spawn('node', ['script.js'])
    const { markdown } = req.body

    // const cssPath = serverPath('public/resume-css-stylesheet.css')

    let args = `-s --toc`

    nodePandoc(markdown, args, (err, result) => {
      if (err) {
        throw err
      }
      return res.status(200).json({ result })
    })
  }
}
