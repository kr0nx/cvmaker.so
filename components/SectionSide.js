import { useState, useEffect } from 'react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import SortableItem from './SortableItem'

import { useStateValue } from 'context'

const SectionSide = ({ sections, resetSections, resetSection }) => {
  const {
    state: { sectionSlugs, selectedSlugs },
    dispatch
  } = useStateValue()

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const onAddSection = (event, slug) => {
    event.preventDefault()

    dispatch({ type: 'ADD_SECTION', slug })
  }

  const onReset = (event) => {
    event.preventDefault()

    resetSections()

    dispatch({ type: 'RESET_SECTIONS', sections })
  }

  const onDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = selectedSlugs.findIndex((slug) => slug === active.id)
      const newIndex = selectedSlugs.findIndex((slug) => slug === over.id)

      dispatch({
        type: 'MOVE_SECTION',
        selectedSlugs: arrayMove(selectedSlugs, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="hidden md:block md:w-[330px] flex-shrink-0">
      <div className="flex items-center justify-between text-baby-blue-eyes px-2 -mt-2">
        <h3 className="px-1 text-sm font-medium  border-b-2 border-transparent  whitespace-nowrap focus:outline-none">
          Sections
        </h3>
        <button className="flex items-center justify-between  space-x-3 text-sm" onClick={onReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>

          <span>Reset</span>
        </button>
      </div>

      <div className="px-3 pr-4 overflow-y-scroll full-screen ">
        {selectedSlugs.length > 0 && (
          <h4 className="mb-3 text-sm leading-6 text-gray-200 ">
            Click on a section below to edit the contents
          </h4>
        )}

        <ul className="mb-12 space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={selectedSlugs}>
              {selectedSlugs.map((slug) => {
                const template = sections.find((section) => section.slug === slug)
                return (
                  <SortableItem
                    key={slug}
                    id={slug}
                    section={template}
                    resetSection={resetSection}
                  />
                )
              })}
            </SortableContext>
          </DndContext>
        </ul>

        {sectionSlugs.length > 0 && (
          <h4 className="mb-3 text-sm leading-6 text-gray-200 ">
            Click on a section below to add it to your readme
          </h4>
        )}

        <ul className="mb-12 space-y-3">
          {sectionSlugs.sort().map((slug) => {
            const template = sections.find((section) => section.slug === slug)

            if (template) {
              return (
                <li key={slug}>
                  <button
                    className="flex items-center w-full h-full py-2 pl-3 pr-6 bg-white dark:bg-gray-200 rounded-md shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-700"
                    type="button"
                    onClick={(event) => onAddSection(event, slug)}
                  >
                    <span>{template.name}</span>
                  </button>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

export default SectionSide
