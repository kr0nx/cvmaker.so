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

const htmlArgs = [
  '-f',
  'markdown+tex_math_single_backslash+tex_math_dollars',
  '-t',
  'html5',
  `--css=${getCssPath()}`,
  '--standalone',
  '--table-of-contents'
]

const pdfArgs = [
  '-f',
  'markdown+raw_html+implicit_figures+tex_math_single_backslash+tex_math_dollars',
  '--latex-engine',
  'xelatex',
  '--standalone',
  '--table-of-contents',
  '-o',
  serverPath('public/resume.pdf')
]

export { htmlArgs, pdfArgs }
