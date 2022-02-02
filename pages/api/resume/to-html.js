import path from 'path'
import { spawn } from 'child_process'
import getConfig from 'next/config'
import nodePandoc from 'node-pandoc'

const serverPath = staticFilePath => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown } = req.body

    const cssPath = serverPath('public/resume-css-stylesheet.css')

    let args = `-s --toc -f markdown_github -t html5 -H ${cssPath}`

    const callback = (err, result) => {
      if (err) {
        throw err
      } else {
        res.status(200).json({ result })
      }
    }

    // Call pandoc
    nodePandoc(markdown, args, callback)

    // var child = spawn('pandoc', [
    //   '-s',
    //   '--toc',
    //   '--from=markdown_github',
    //   '--to=html',
    //   `--css=${cssPath}`
    // ])
    // child.stdin.write(markdown)
    // child.stdout.on('data', function(data) {
    //   res.status(200).json({ data: data.toString() })
    // })
    // child.stdin.end()
  }
}
