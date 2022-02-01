import path from 'path'
import getConfig from 'next/config'
// import nodePandoc from 'node-pandoc'
var pandoc = require('pandoc')

const serverPath = staticFilePath => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { markdown } = req.body

    // const cssPath = serverPath('public/resume-css-stylesheet.css')

    let args = `-s --toc`

    pandoc.convert('markdown', markdown, ['html'], function(result, err) {
      if (err) {
        console.log(err)
      } else {
        let html = result.html
        return res.status(200).json({ result: html })
      }
    })

    // nodePandoc(markdown, args, (err, result) => {
    //   if (err) {
    //     throw err
    //   }
    //   return res.status(200).json({ result })
    // })
  }
}
