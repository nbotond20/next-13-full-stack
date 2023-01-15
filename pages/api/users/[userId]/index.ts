import { deleteUser, getUserById, updateUser } from '@db/users'
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

  if (req.method === 'PUT') {
    const { userId } = req.query
    const { user } = await getUserById(userId as string)
    if (!user) {
      return res.status(404).json({ message: `User with id ${userId} was not found.` })
    }

    const { name, email, role } = req.body

    const updatedUser = await updateUser({
      ...user,
      name,
      email,
      role,
    })

    if (!updatedUser) {
      return res.status(500).json({ message: `User with id ${userId} could not be updated.` })
    }

    return res.status(200).json(updatedUser)
  }

  if (req.method === 'DELETE') {
    const { userId } = req.query
    const { user } = await getUserById(userId as string)
    if (!user) {
      return res.status(404).json({ message: `User with id ${userId} was not found.` })
    }

    const deletedUser = await deleteUser(userId as string)

    if (!deletedUser) {
      return res.status(500).json({ message: `User with id ${userId} could not be deleted.` })
    }

    return res.status(200).json(deletedUser)
  }

  res.setHeader('Allow', ['GET', 'PUT'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
