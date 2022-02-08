import { spawn } from 'child_process'
var optipng = require('pandoc-bin').path
const markdownpdf = require('markdown-pdf')
import getConfig from 'next/config'
import path from 'path'
import { getEnvironment } from 'utils/getEnvironment'

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

const getCssPath = (theme) => {
  const { baseUrl, isProduction } = getEnvironment()

  return isProduction
    ? `${baseUrl}/cv-themes/${theme}.css`
    : serverPath(`public/cv-themes/${theme}.css`)
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
        cssPath: getCssPath(theme),
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
      var pandoc = spawn(optipng, [
        '-f',
        'markdown+tex_math_single_backslash+tex_math_dollars',
        '-t',
        'html5',
        `--css=${getCssPath(theme)}`,
        '--standalone',
        '--table-of-contents'
      ])

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
