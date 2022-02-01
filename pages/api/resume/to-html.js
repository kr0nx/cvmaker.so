import nodePandoc from 'node-pandoc'

export default (req, res) => {
  const { markdown } = req.body

  let args = `-s --toc -V theme=moon`

  nodePandoc(markdown, args, (err, result) => {
    if (err) {
      throw err
    }
    return res.status(200).json({ result })
  })
}
