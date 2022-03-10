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

    const { err, data } = await markdown2Pdf(markdown, theme)

    if (err) {
      return res.end(err.message)
    }

    const { content = '' } = data

    if (!content) return res.end('No PDF content exists in the data')

    res.status(200).send({
      buffer: content
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

const markdown2Pdf = async (md, theme) => {
  let pdf = null

  try {
    pdf = await mdToPdf(
      { content: md },
      {
        stylesheet: getCssPath(theme)
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
