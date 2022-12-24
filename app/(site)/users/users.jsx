// import { getUsers } from '@/lib/prisma/users'
import React from 'react'

import Link from 'next/link'

const Users = async ({ users }) => {
  // const { users } = await getUsers()

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
