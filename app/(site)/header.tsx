'use client'

import React from 'react'

import Link from 'next/link'

import LoginButton from '../components/auth/SignInButton'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li style={{ margin: '8px' }}>
            <Link href="/users">Users</Link>
          </li>
          <li style={{ margin: '8px' }}>
            <Link href="/movies">Movies</Link>
          </li>
        </ul>
        <ul>
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
