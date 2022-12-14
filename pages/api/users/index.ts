// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUsers } from '../../../lib/prisma/users'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { users } = await getUsers()
    if (!users) {
      return res.status(404).json({ message: 'No users found' })
    }
    return res.status(200).json(users)
  }
}