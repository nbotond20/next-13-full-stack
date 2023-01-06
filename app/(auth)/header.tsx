import React from 'react'

import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 h-[73px] items-center flex">
        <div className="flex flex-wrap items-center justify-between w-full">
          <Link href="/" className="flex items-center justify-center gap-1">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="self-center text-xl whitespace-nowrap dark:text-white">Back</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
