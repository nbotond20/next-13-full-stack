import { createComment, getComments } from '@lib/prisma/comments'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { userId, movieId } = req.query as { userId: string; movieId: string }
    if (!userId || !movieId) return res.status(400).json({ message: 'User and movie are required.' })
    const { comments } = await getComments({ movieId })
    if (!comments) return res.status(404).json({ message: 'Comments not found.' })
    return res.status(200).json({ comments })
  }

  if (req.method === 'POST') {
    const { userId, movieId, text, date, parentId, avatar, name, voteCount, likedBy } = req.body as {
      userId: string
      movieId: string
      text: string
      date: Date
      parentId: string
      avatar: string
      name: string
      voteCount: number
      likedBy: string[]
    }

    if (!userId || !movieId || !text || !date || !avatar || !name || voteCount !== 0 || !likedBy) {
      return res
        .status(400)
        .json({ message: 'User, movie, text, date, avatar, name, voteCount and likedBy are required.' })
    }

    const newComment = await createComment({
      userId,
      movieId,
      text,
      date,
      parentId,
      avatar,
      name,
      voteCount,
      likedBy,
    })

    if (!newComment || newComment.error) return res.status(400).json({ message: 'Comment could not be created.' })

    return res.status(201).json({ newComment })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
