import React from 'react'

import { getUsers } from '@db/users'

import Users from './Users'

async function getData() {
  const { users } = await getUsers()
  if (!users) {
    throw new Error('Failed to fetch data')
  }

  return users
}

const Page = async () => {
  const users = await getData()

  return <Users users={users} />
}

export default Page
