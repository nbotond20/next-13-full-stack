import React from 'react'

import { User as PrismaUser } from '@prisma/client'

const User = ({ user }: { user: PrismaUser }) => {
  return (
    <section>
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    </section>
  )
}

export default User
