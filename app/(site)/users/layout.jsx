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

const UsersLayout = async ({ children }) => {
  const users = await getData()

  return (
    <section>
      <aside>
        <Users users={users} />
      </aside>
      <main>{children}</main>
    </section>
  )
}

export default UsersLayout
