// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { createUser } from '../../../lib/prisma/users'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body
    const { user } = await createUser({ name, email, password })
    return res.status(200).json(user)
  }
}
