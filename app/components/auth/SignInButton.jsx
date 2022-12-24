'use client'

import React from 'react'

import { Box } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'

const SignInButton = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <Box sx={{ width: '100px', height: '100px', position: 'fixed', right: 0, top: 0 }}>
          <span>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </Box>

        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  return <button onClick={() => signIn()}>Sign In</button>
}

export default SignInButton
