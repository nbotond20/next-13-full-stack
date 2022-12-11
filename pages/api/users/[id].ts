// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUser } from '../../../lib/prisma/users'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!req.query.id) {
      return res.status(404).json({ message: 'No user found' })
    }
    const { user } = await getUser(req.query.id as string)
    return res.status(200).json(user)
  }
}
