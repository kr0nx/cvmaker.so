import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'
import { useState, useEffect, useRef } from 'react'
import { useStateValue } from 'context'

const MdEditor = () => {
  const {
    state: { sections, focusedSlug },
    dispatch
  } = useStateValue()

  const editorRef = useRef(null)

  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const markdown = sections.find((section) => section.slug === focusedSlug)?.markdown
    setMarkdown(markdown)
  }, [focusedSlug])

  const onEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
  }

  const onEdit = (value) => {
    setMarkdown(value)
  }

  return (
    <Editor
      theme="vs-dark"
      value={markdown}
      onChange={onEdit}
      onMount={onEditorDidMount}
      className="rounded-sm ring-2 ring-orchid-pink mt-9 full-screen"
      loading={'Loading...'}
      options={{
        minimap: { enabled: false },
        lineNumbers: false,
        fontSize: 14,
        fontFamily: 'Cascadia Code'
      }}
    />
  )
}

export default MdEditor
