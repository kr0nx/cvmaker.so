import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useStateValue } from 'context'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const MdPreview = ({ sections }) => {
  const {
    state: { selectedSlugs, cvTheme },
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
    <div className="w-full">
      <div className="markdown-body-default">
        <ReactMarkdown
          className=" text-center h-[630px] rounded-sm px-4 py-4 overflow-y-scroll"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter style={coy} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MdPreview
