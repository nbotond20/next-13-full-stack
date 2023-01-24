import { getUserByEmail } from '@db/users'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { email } = req.query
    const { user } = await getUserByEmail(email as string)
    if (!user) return res.status(404).json({ message: `No user with email ${email} found.` })
    return res.status(200).json({ user })
  }
}

export default handler
