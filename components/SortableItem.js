import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useStateValue } from 'context'

const SortableItem = ({ id, section }) => {
  const { state, dispatch } = useStateValue()
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const onRemoveSection = (event) => {
    dispatch({ type: 'REMOVE_SECTION', slug: section.slug })
  }

  const onClickSection = () => {
    dispatch({ type: 'FOCUS_SECTION', slug: section.slug })
  }

  const onKeyUp = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      onClickSection()
    }
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClickSection}
      onKeyUp={onKeyUp}
      className={`flex items-center justify-between px-4 bg-gray-200 shadow rounded-md py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nadeshiko-pink relative `}
    >
      <div className="flex items-center space-x-2">
        <button type="button" className="cursor-grab" {...listeners}>
          <img src={'drag.svg'} alt="drag" className="w-6 h-6" />
        </button>
        <p className="text-gray-900 leading-7">{section.name}</p>
      </div>

      {state.focusedSlug === section.slug && (
        <div className="flex items-center space-x-2">
          {/* Reset Icon */}
          <button className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>

          {/* Trash Icon */}
          <button className="flex items-center justify-center" onClick={onRemoveSection}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  )
}

export default SortableItem
