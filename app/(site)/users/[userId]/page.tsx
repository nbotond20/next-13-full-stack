import React from 'react'

import { getUserById } from '@db/users'
import { Auth } from 'components/auth/Auth'

import User from './user'

async function getUser(userId: string) {
  const { user } = await getUserById(userId)
  if (!user) {
    throw new Error('Failed to fetch data')
  }

  return user
}

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUser(params.userId)

  return (
    <Auth>
      <User user={user} />
    </Auth>
  )
}

export default Page
