// import { getUsers } from '@/lib/prisma/users'
import React from 'react'

import { User as PrismaUser } from '@prisma/client'
import Link from 'next/link'

interface UsersProps {
  users: PrismaUser[]
}

const Users = ({ users }: UsersProps) => {
  return (
    <section>
      <div>
        <h2>Users</h2>
        <ul>
          {users?.map(user => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Users
