'use client'

import React from 'react'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const SignInButton = () => {
  const { data: session } = useSession()

  const pathname = usePathname()

  if (session) {
    return (
      <div className="flex items-center">
        <button
          onClick={() => signOut({ callbackUrl: pathname || '/' })}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Out
        </button>

        <div className="flex items-center space-x-4">
          <Image
            className="w-10 h-10 rounded-full"
            src={session?.user?.image || ''}
            alt="User Image"
            width={50}
            height={50}
          />
          <div className="font-medium dark:text-white">
            <div>{session.user?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn()}
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Sign In
    </button>
  )
}

export default SignInButton
