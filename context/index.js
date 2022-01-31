import { useReducer, createContext, useContext } from 'react'

const initialState = {
  sections: [],
  sectionSlugs: [],
  selectedSections: [],
  selectedSlugs: [],
  focusedSection: null
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
    case 'SELECT_SECTION':
      return {
        ...state,
        sectionSlugs: state.sectionSlugs.filter((slug) => slug !== action.slug),
        selectedSlugs: [...state.selectedSlugs, action.slug]
      }
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext)
