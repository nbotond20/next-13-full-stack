import { getUsers, createUser, getUserByEmail } from '@db/users'
import { hashPass } from '@lib/utils/hashPass'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { users } = await getUsers()
    if (!users) return res.status(404).json({ message: 'No users found.' })
    return res.status(200).json({ users })
  }

  if (req.method === 'POST') {
    const data = req.body as { name: string; email: string; password: string }
    if (!data) return res.status(400).json({ message: 'No data provided.' })
    if (!data.email || !data.password) return res.status(400).json({ message: 'Email and password are required.' })

    const { user: existingUser } = await getUserByEmail(data.email)
    if (existingUser) return res.status(409).json({ message: 'User already exists.' })

    const passwordHash = await hashPass(data.password)
    const { user } = await createUser({ name: data.name, email: data.email, passwordHash })
    if (!user) return res.status(500).json({ message: 'User was not created.' })
    return res.status(200).json({ user })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
