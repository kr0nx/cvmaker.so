import { useReducer, createContext, useContext } from 'react'

const initialState = {
  sections: [],
  sectionSlugs: [],
  selectedSections: [],
  selectedSlugs: [],
  focusedSlug: null
}

const StateContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTIONS':
      return {
        ...state,
        sections: action.sections,
        sectionSlugs: action.sections.map((section) => section.slug)
      }
    case 'ADD_SECTION':
      return {
        ...state,
        sectionSlugs: state.sectionSlugs.filter((slug) => slug !== action.slug),
        selectedSlugs: [...state.selectedSlugs, action.slug],
        focusedSlug: action.slug
      }

    case 'REMOVE_SECTION':
      return {
        ...state,
        sectionSlugs: [...state.sectionSlugs, action.slug],
        selectedSlugs: state.selectedSlugs.filter((slug) => slug !== action.slug),
        focusedSlug: null
      }

    case 'FOCUS_SECTION':
      return {
        ...state,
        focusedSlug: action.slug
      }

    case 'RESET_SECTIONS':
      return {
        ...state,
        sections: [],
        sectionSlugs: [],
        selectedSections: [],
        selectedSlugs: [],
        focusedSlug: null
      }

    default:
      return state
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext)
