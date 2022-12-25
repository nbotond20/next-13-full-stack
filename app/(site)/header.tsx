'use client'

import React from 'react'

import { Auth } from '@app/components/auth/Auth'
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
          <Auth>
            <li>
              <Link href="/users">Users</Link>
            </li>
          </Auth>
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
