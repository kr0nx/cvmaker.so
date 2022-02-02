import { useReducer, createContext, useContext } from 'react'

const initialState = {
  sectionSlugs: [],
  selectedSlugs: [],
  focusedSlug: null
}

const StateContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL_SETUP':
      return {
        ...state,
        sectionSlugs: action.sections
          .filter((section) => section.slug !== 'name-and-surname')
          .map((section) => section.slug),
        selectedSlugs: ['name-and-surname'],
        focusedSlug: 'name-and-surname'
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
        sectionSlugs: action.sections
          .filter((section) => section.slug !== 'name-and-surname')
          .map((section) => section.slug),
        selectedSlugs: ['name-and-surname'],
        focusedSlug: 'name-and-surname'
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
