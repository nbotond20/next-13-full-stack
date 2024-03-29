'use client'

import React from 'react'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const { data: session } = useSession()

  const router = useRouter()

  if (session?.user) {
    router.push('/')
  }

  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })

  const handleSignIn = async () => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    // TODO Handle login errors

    if (!res?.error) {
      router.push('/')
    }
  }

  return (
    <div className="overflow-auto m-auto mt-5 mb-5 sm:mt-14 lg:mt-32 w-full max-w-sm p-4 bg-white sm:border sm:border-gray-200 sm:rounded-lg sm:shadow-md sm:p-6 md:p-8 dark:bg-gray-900 dark:sm:bg-gray-800 dark:border-gray-700 md:min-w-[400px] relative">
      <div className="space-y-6">
        <h4 className="text-3xl font-medium text-gray-900 dark:text-white">Login to our platform</h4>
        <div>
          <label form="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Email"
            required
            onChange={e => {
              setValues({ ...values, email: e.target.value })
            }}
            value={values.email}
          />
        </div>
        <div>
          <label form="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={e => {
              setValues({ ...values, password: e.target.value })
            }}
            value={values.password}
          />
        </div>

        <div className="flex flex-col justify-center">
          <button
            onClick={() => handleSignIn()}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 dark:sm:bg-gray-800">
              or
            </span>
          </div>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
          >
            <span className="flex justify-center gap-2 w-full items-center">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </span>
          </button>
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{' '}
          <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
