import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useStateValue } from 'context'

const MdPreview = ({ sections }) => {
  const {
    state: { selectedSlugs },
    dispatch
  } = useStateValue()

  const markdown = selectedSlugs.reduce((acc, slug) => {
    const template = sections.find((s) => s.slug === slug)
    if (template) {
      return `${acc}${template.markdown}`
    } else {
      return acc
    }
  }, ``)

  return (
    <div className="preview">
      <ReactMarkdown
        className="bg-white h-[630px] rounded-md px-4 py-4 overflow-y-scroll"
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default MdPreview
