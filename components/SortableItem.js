import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableItem = ({ id, section }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const onClickSection = () => {}

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
      className={`bg-gray-200 shadow rounded-md pl-1 pr-14 py-2 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600 relative `}
    >
      <button
        type="button"
        className="mr-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600"
        {...listeners}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
      <p>{section.name}</p>
    </li>
  )
}

export default SortableItem
