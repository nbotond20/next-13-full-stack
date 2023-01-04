import React from 'react'

import { getUsers } from '@db/users'
import { Auth } from 'components/auth/Auth'

import Users from './users'

async function getData() {
  const { users } = await getUsers()
  if (!users) {
    throw new Error('Failed to fetch data')
  }

  return users
}

const Page = async () => {
  const users = await getData()

  return (
    <Auth>
      <section>
        <Users users={users} />
      </section>
    </Auth>
  )
}

export default Page
