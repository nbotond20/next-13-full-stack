import React from 'react'

import { getUserById } from '@lib/prisma/users'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

import { Gym } from './Gym'

const GymPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || session.user.email !== 'nuszplbotond@gmail.com') {
    return null
  }
  const { user } = await getUserById(session.user.id)

  if (!user) return null

  return <Gym />
}

export default GymPage
