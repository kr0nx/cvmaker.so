import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

const supportedLanguages = [
  {
    lng: 'en',
    name: 'English',
    flag: '🇺🇸',
    route: '/en'
  },
  {
    lng: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
    route: '/tr'
  }
]

const LanguagePicker = () => {
  const [t, i18n] = useTranslation()

  const [language, setLanguage] = useState(i18n.language)

  const changeLanguage = (lng) => {
    if (lng !== language) {
      i18n.changeLanguage(lng)
      setLanguage(lng)
    }
  }

  return (
    <div className="relative h-12 group">
      <button className="flex items-center px-6 py-2 text-sm font-semibold text-white uppercase bg-pink-700 rounded-md">
        <span>{language}</span>
      </button>

      <nav
        tabIndex="0"
        className="invisible w-full overflow-hidden transition-all bg-gray-100 border-2 border-gray-800 rounded-md opacity-0 top-full group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
      >
        <ul>
          {supportedLanguages.map(({ lng, name, flag, route }) => (
            <li key={lng}>
              <a
                href={route}
                className="block px-4 py-1 hover:bg-gray-200"
                onClick={() => changeLanguage(lng)}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default LanguagePicker
