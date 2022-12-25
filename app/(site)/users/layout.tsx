import React from 'react'

import { getUsers } from '@db/users'

import Users from './users'

export const revalidate = 0

async function getData() {
  const { users } = await getUsers()
  if (!users) {
    throw new Error('Failed to fetch data')
  }

  return users
}

interface UsersLayoutProps {
  children: React.ReactNode
}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  const users = await getData()

  return (
    <section>
      <aside>
        {/* @ts-expect-error Server Component */}
        <Users users={users} />
      </aside>
      <main>{children}</main>
    </section>
  )
}

export default UsersLayout
