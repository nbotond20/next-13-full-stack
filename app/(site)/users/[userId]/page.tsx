import React from 'react'

import { Auth } from '@app/components/auth/Auth'
import { getUserById, getUsers } from '@db/users'

import User from './user'

export async function generateStaticParams() {
  const { users } = await getUsers()

  return users?.map(user => ({
    userId: user.id,
  }))
}

async function getUser(userId: string) {
  const { user } = await getUserById(userId)
  if (!user) {
    throw new Error('Failed to fetch data')
  }

  return user
}

// Create a page params type
export type PageParams = {
  userId: string
}

const Page = async (params: { userId: string }) => {
  const user = await getUser(params.userId)

  return (
    <Auth>
      <User user={user} />
    </Auth>
  )
}

export default Page
