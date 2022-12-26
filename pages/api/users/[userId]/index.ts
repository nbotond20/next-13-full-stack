import { getUserById } from '@db/users'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { userId } = req.query
    const { user } = await getUserById(userId as string)
    if (!user) {
      return res.status(404).json({ message: `User with id ${userId} was not found.` })
    }
    return res.status(200).json({ user })
  }

  res.setHeader('Allow', ['GET'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
