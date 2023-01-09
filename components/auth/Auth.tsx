'use client'

import React from 'react'

import { useSession } from 'next-auth/react'

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()

  if (session.status === 'loading') {
    return <div>Loading...</div>
  }

  if (session.status === 'unauthenticated') {
    return <div>Unauthenticated</div>
  }

  return <div>{children}</div>
}
