import { createRating } from '@lib/prisma/ratings'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, movieId, rating } = req.body as {
      userId: string
      movieId: string
      rating: number
    }

    if (!userId || !movieId || !rating) {
      return res.status(400).json({ message: 'userId, movieId and rating are required.' })
    }

    if (typeof rating !== 'number') return res.status(400).json({ message: 'Rating must be a number.' })

    if (rating < 0 || rating > 5) return res.status(400).json({ message: 'Rating must be between 0 and 5.' })

    const newRating = await createRating({
      userId,
      movieId,
      rating,
    })

    if (!newRating || newRating.error) return res.status(400).json({ message: 'Rating could not be created.' })

    return res.status(201).json({ newRating })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
