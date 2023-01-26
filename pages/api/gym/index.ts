import { getUserById, updateUser } from '@db/users'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { userId } = req.query
    const { user } = await getUserById(userId as string)
    if (!user) {
      return res.status(404).json({ message: `User with id ${userId} was not found.` })
    }

    if (!user.gym) return res.status(404).json({ message: `User with id ${userId} has no gym.` })

    return res.status(200).json({ gym: user.gym })
  }

  if (req.method === 'PUT') {
    const data = req.body as { userId: string; gym: string }
    if (!data) return res.status(400).json({ message: 'No data provided.' })
    if (!data.userId || !data.gym) return res.status(400).json({ message: 'UserId and gym are required.' })

    const { user } = await getUserById(data.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const { user: updatedUser } = await updateUser({ ...user, gym: data.gym })
    if (!updatedUser) return res.status(500).json({ message: 'Gym was not saved.' })
    return res.status(200).json({ updatedUser })
  }

  res.setHeader('Allow', ['GET', 'PUT'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
