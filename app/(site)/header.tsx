'use client'

import React from 'react'

import { HeaderLink } from '@components/HeaderLink'
import { Avatar, DarkThemeToggle, Dropdown, Flowbite, Navbar } from 'flowbite-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <Flowbite>
      <Navbar fluid={true}>
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              height={24}
              width={24}
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl  font-semibold dark:text-white">MovieDB</span>
          </div>
        </Link>
        <div className="flex md:order-2">
          <DarkThemeToggle className="mr-3" />
          {session?.user ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img={session.user?.image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                    rounded={true}
                    className="mr-3"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{session?.user.name}</span>
                  <span className="block truncate text-sm font-medium">{session?.user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => signOut({ callbackUrl: pathname || '/' })}>Sign out</Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <HeaderLink href="/" active={pathname === '/'}>
            Home
          </HeaderLink>
          <HeaderLink href="/movies" active={pathname?.startsWith('/movies')}>
            Movies
          </HeaderLink>
          {session?.user?.role === 'ADMIN' && (
            <HeaderLink href="/users" active={pathname?.startsWith('/users')}>
              Users
            </HeaderLink>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Flowbite>
  )
}

export default Header
