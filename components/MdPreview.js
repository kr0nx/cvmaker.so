import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useStateValue } from 'context'
import { indigo, emerald, sky, pink } from 'tailwindcss/colors'

const supportedThemes = [
  {
    name: 'default',
    color: indigo[500]
  },
  {
    name: 'air',
    color: emerald[500]
  },
  {
    name: 'retro',
    color: sky[500]
  },
  {
    name: 'splendor',
    color: pink[500]
  }
]

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
    <div className="relative">
      <div className=" h-12 group absolute top-2 ">
        <button className="flex items-center px-6 py-2 text-sm font-semibold text-white uppercase bg-pink-700 rounded-md">
          <span>Theme</span>
        </button>

        <nav
          tabIndex="0"
          className="invisible w-full overflow-hidden transition-all bg-gray-100 border-2 border-gray-800 rounded-md opacity-0 top-full group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
        >
          <ul>
            {supportedThemes.map(({ name, color }) => (
              <li key={name} className="list-none">
                <a href={'#'} className={`block px-4 py-1  hover:bg-gray-200 bg-[${color}]`}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="preview">
        <ReactMarkdown
          className="bg-white h-[630px] rounded-md px-4 py-4 overflow-y-scroll"
          remarkPlugins={[remarkGfm]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MdPreview
