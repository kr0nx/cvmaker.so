import { useState, useEffect, useRef } from 'react'
import { useStateValue } from 'context'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'

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
    // <Editor
    //   theme="vs-dark"
    //   value={markdown}
    //   onChange={onEdit}
    //   onMount={onEditorDidMount}
    //   className="rounded-sm ring-2 ring-orchid-pink mt-4 full-screen"
    //   loading={'Loading...'}
    //   options={{
    //     minimap: { enabled: false },
    //     lineNumbers: false,
    //     fontSize: 15,
    //     fontFamily: 'Cascadia Code',
    //     automaticLayout: true
    //   }}
    // />
    <CodeMirror
      className="rounded-sm ring-2 ring-orchid-pink mt-4 full-screen focus:outline-none"
      value={code}
      onChange={onEdit}
      autoFocus
      indentWithTab={false}
      theme={oneDark}
      style={{ fontSize: '1rem' }}
      height="100%"
      width="100%"
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
    />
  )
}

export default MdEditor
