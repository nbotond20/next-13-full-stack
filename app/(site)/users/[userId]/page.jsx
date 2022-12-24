import React from 'react'

import { getUserById, getUsers } from '@db/users'

import User from './user'

export async function generateStaticParams() {
  const { users } = await getUsers()

  return users?.map(user => ({
    userId: user.id,
  }))
}

async function getUser(userId) {
  const { user } = await getUserById(userId)
  if (!user) {
    throw new Error('Failed to fetch data')
  }

  return user
}

const Page = async ({ params }) => {
  const user = await getUser(params.userId)

  return <User user={user} />
}

export default Page
