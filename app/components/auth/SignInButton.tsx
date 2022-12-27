'use client'

import React from 'react'

import { Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'

const SignInButton = () => {
  const { data: session } = useSession()

  if (session) {
    return <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
  }

  return <Button onClick={() => signIn()}>Sign In</Button>
}

export default SignInButton
