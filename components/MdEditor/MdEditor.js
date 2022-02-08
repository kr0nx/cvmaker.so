import { useState, useEffect, useRef } from 'react'
import { useStateValue } from 'context'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/blackboard.css'
import { customTheme } from './customTheme'

const MdEditor = ({ sections, updateSections }) => {
  const {
    state: { focusedSlug },
    dispatch
  } = useStateValue()

  const editorRef = useRef(null)

  const [code, setCode] = useState('')

  useEffect(() => {
    const markdown = sections.find((section) => section.slug === focusedSlug)?.markdown || ''
    setCode(markdown)
  }, [focusedSlug, sections])

  const onEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
  }

  const onEdit = (value) => {
    setCode(value)

    const newSections = sections.map((section) => {
      if (section.slug === focusedSlug) {
        return { ...section, markdown: value }
      }
      return section
    })

    updateSections(newSections)
  }

  return (
    <>
      <CodeMirror
        className="rounded-sm ring-1 ring-orchid-pink mt-4 h-full"
        value={code}
        onChange={onEdit}
        autoFocus
        indentWithTab={false}
        theme={customTheme}
        style={{ fontSize: '0.92rem' }}
        height="100%"
        width="100%"
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
      />
    </>
  )
}

export default MdEditor
