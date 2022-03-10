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
    ? `/cv-themes/${theme}.css`
    : serverPath(`public/cv-themes/${theme}.css`)
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown, theme } = req.body

    if (!markdown) {
      res.statusCode = 400
      res.end('No markdown provided')
      return
    }

    const { err, data } = await markdown2Html(markdown, theme)

    if (err) {
      return res.end(err.message)
    }

    const { content = '' } = data

    if (!content) return res.end('No HTML content exists in the data')

    res.status(200).send({
      content
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

const markdown2Html = async (md, theme) => {
  let html = null

  try {
    html = await mdToPdf(
      { content: md },
      {
        stylesheet: getCssPath(theme),
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
