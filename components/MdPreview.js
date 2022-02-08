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

  const changeCvTheme = (theme) => {
    dispatch({ type: 'SET_THEME', theme })
  }

  return (
    <div className="relative">
      <div className=" h-12 group absolute top-4 right-4 ">
        <button className="flex items-center px-3 py-1 text-sm font-semibold text-gray-900 uppercase bg-transparent rounded-md border-2 border-gray-900 hover:bg-gray-100 shadow-lg">
          <span>{cvTheme}</span>
        </button>

        <nav
          tabIndex="0"
          className="invisible w-full overflow-hidden transition-all bg-gray-100 border-2 border-gray-800 rounded-md opacity-0 top-full group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
        >
          <ul>
            {supportedThemes.map(({ name, color }) => (
              <li key={name}>
                <a
                  href={'#'}
                  className={`block px-4 py-1  hover:bg-gray-200`}
                  onClick={() => changeCvTheme(name)}
                >
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
