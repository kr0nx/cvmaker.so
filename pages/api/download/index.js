import { spawn } from 'child_process'
import { htmlArgs, pdfArgs } from './arguments'
var optipng = require('pandoc-bin').path
const markdownpdf = require('markdown-pdf')
const fs = require('fs')
import getConfig from 'next/config'
import path from 'path'
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

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown, downloadAs } = req.body

    if (!markdown) {
      res.statusCode = 400
      res.end('No markdown provided')
      return
    }

    if (downloadAs === 'pdf') {
      markdownpdf({
        cssPath: getCssPath(),
        remarkable: {
          html: true,
          typographer: true,
          breaks: true
        }
      })
        .from.string(markdown)
        // .to(serverPath('public/resume.pdf')),
        .to.buffer(function (err, result) {
          console.log(result)
          res.status(200).json({
            result: result
          })
        })
    }

    // let args = htmlArgs

    // var pandoc = spawn('pandoc', [...args])

    // pandoc.stdin.write(markdown)
    // pandoc.stdin.end()

    // pandoc.stdout.on('data', function (data) {
    //   res.status(200).json({ result: data.toString() })
    // })
    // pandoc.stderr.on('data', function (data) {
    //   res.status(500).json({ error: data.toString() })
    // })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
