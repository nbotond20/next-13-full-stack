import React from 'react'

import { Auth } from '@app/components/auth/Auth'
import { getUsers } from '@db/users'

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
