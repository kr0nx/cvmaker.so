import { spawn } from 'child_process'
import { htmlArgs, pdfArgs } from './arguments'
var optipng = require('pandoc-bin').path
const markdownpdf = require('markdown-pdf')
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

function preProcessMd() {
  return through(function (data, ...args) {
    console.log(args)
    pageBreak = '\n\n<div style="page-break-before: always;"></div>\n\n'
    this.queue(loadNunjucks(data) + pageBreak)
  })
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
          typographer: false,
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
      var pandoc = spawn('pandoc', [...htmlArgs])

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
