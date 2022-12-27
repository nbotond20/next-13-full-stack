'use client'

import React from 'react'

import { Auth } from '@app/components/auth/Auth'
import Link from 'next/link'

import LoginButton from '../components/auth/SignInButton'

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#3ff79b',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: '7vh',
      }}
    >
      <nav style={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden', height: '100%' }}>
        <ul style={{ display: 'flex' }}>
          <li style={{ margin: '8px' }}>
            <Link href="/">Home</Link>
          </li>
          <li style={{ margin: '8px' }}>
            <Link href="/users">Users</Link>
          </li>
        </ul>
        <ul style={{ margin: '8px' }}>
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
