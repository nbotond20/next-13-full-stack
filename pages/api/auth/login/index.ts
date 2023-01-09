import { getUserByEmail } from '@db/users'
import { comparePass } from '@lib/utils/hashPass'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body as { email: string; password: string }
    if (!data) return res.status(400).json({ message: 'No data provided.' })
    if (!data.email || !data.password) return res.status(400).json({ message: 'Email and password are required.' })
    const { user } = await getUserByEmail(data.email)
    if (!user) return res.status(404).json({ message: 'User was not found.' })
    if (!user.passwordHash) return res.status(409).json({ message: 'This email is used by another provider' })
    const passwordMatch = await comparePass(data.password, user.passwordHash)
    if (!passwordMatch) return res.status(401).json({ message: 'Password is incorrect.' })
    return res.status(200).json({ user })
  }

  res.setHeader('Allow', ['POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
