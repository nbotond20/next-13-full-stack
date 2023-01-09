import { getUsers, createUser } from '@db/users'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { users } = await getUsers()
    if (!users) return res.status(404).json({ message: 'No users found.' })
    return res.status(200).json({ users })
  }

  if (req.method === 'POST') {
    const data = req.body
    if (!data) return res.status(400).json({ message: 'No data provided.' })
    const { user } = await createUser(data)
    if (!user) return res.status(500).json({ message: 'User was not created.' })
    return res.status(200).json({ user })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
