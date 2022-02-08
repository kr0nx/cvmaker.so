import { spawn } from 'child_process'
import { htmlArgs, pdfArgs } from './arguments'
var optipng = require('pandoc-bin').path
const markdownpdf = require('markdown-pdf')
import getConfig from 'next/config'
import path from 'path'
import { getEnvironment } from 'utils/getEnvironment'

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

const getCssPath = () => {
  const { baseUrl, isProduction } = getEnvironment()

  return isProduction
    ? `${baseUrl}/resume-css-stylesheet.css`
    : serverPath('public/resume-css-stylesheet.css')
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown, downloadAs, theme } = req.body

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
        .to.buffer(function (err, result) {
          res.status(200).json({
            result
          })
        })
    }

    if (downloadAs === 'html') {
      var pandoc = spawn(optipng, [...htmlArgs])

      pandoc.stdin.write(markdown)
      pandoc.stdin.end()

      pandoc.stdout.on('data', function (data) {
        res.status(200).json({ result: data.toString() })
      })
      pandoc.stderr.on('data', function (data) {
        res.status(500).json({ error: data.toString() })
      })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
