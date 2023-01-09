import { createUser, getUserByEmail } from '@db/users'
import { hashPass } from '@lib/utils/hashPass'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body as { email: string; password: string; name: string }
    if (!data) return res.status(400).json({ message: 'No data provided.' })
    if (!data.email || !data.password || !data.name)
      return res.status(400).json({ message: 'Username, Email and Password are required.' })

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(data.email)) return res.status(400).json({ message: 'Email is not valid.' })

    const passwordRegex = /^[a-zA-Z0-9]{3,}$/
    if (!passwordRegex.test(data.password))
      return res.status(400).json({ message: 'Password must be at least 3 characters long.' })

    const { user } = await getUserByEmail(data.email)
    if (user) return res.status(409).json({ message: 'User already exists.' })

    const passwordHash = await hashPass(data.password)
    const { user: newUser } = await createUser({ name: data.name, email: data.email, passwordHash })

    return res.status(200).json({ newUser })
  }

  res.setHeader('Allow', ['POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
