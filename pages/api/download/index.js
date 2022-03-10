import { spawn } from 'child_process'
var optipng = require('pandoc-bin').path
import getConfig from 'next/config'
import path from 'path'
const { mdToPdf } = require('md-to-pdf')
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
      const { err, data } = await markdown2Pdf(markdown)

      if (err) {
        return res.end(err.message)
      }

      const { content = '' } = data

      if (!content) return res.end('No PDF content exists in the data')

      res.status(200).send({
        buffer: content
      })
    }

    if (downloadAs === 'html') {
      const { err, data } = await markdown2Html(markdown)

      if (err) {
        return res.end(err.message)
      }

      const { content = '' } = data

      if (!content) return res.end('No HTML content exists in the data')

      res.status(200).send({
        content
      })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

const markdown2Html = async (md) => {
  let html = null

  try {
    html = await mdToPdf(
      { content: md },
      {
        stylesheet: getCssPath('default'),
        as_html: true
      }
    )
  } catch (err) {
    return { err }
  }

  if (html && html.content) {
    return { data: html }
  } else {
    return { err: new Error('No html content.') }
  }
}

const markdown2Pdf = async (md) => {
  let pdf = null

  try {
    pdf = await mdToPdf(
      { content: md },
      {
        stylesheet: getCssPath('default')
      }
    )
  } catch (err) {
    return { err }
  }

  if (pdf && pdf.content) {
    return { data: pdf }
  } else {
    return { err: new Error('No pdf content.') }
  }
}
