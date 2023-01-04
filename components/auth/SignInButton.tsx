'use client'

import React from 'react'

import { useSession, signIn, signOut } from 'next-auth/react'

const SignInButton = () => {
  const { data: session } = useSession()

  if (session) {
    return <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
  }

  return <button onClick={() => signIn()}>Sign In</button>
}

export default SignInButton
