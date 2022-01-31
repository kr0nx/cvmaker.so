import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-900 items-center w-full">
      <Link href={'/'} passHref>
        <a className="focus:outline-none focus:ring-fuchsia-400 flex items-center">
          <img src="cv.svg" alt="cv logo" className="w-auto h-12" />
        </a>
      </Link>
    </nav>
  )
}

export default Nav
