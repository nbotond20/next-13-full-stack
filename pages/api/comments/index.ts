import { createComment, getMostRecentComments } from '@db/movies'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { comments } = await getMostRecentComments()
    if (!comments) {
      return res.status(404).json({ message: 'Most recent comments not found' })
    }
    return res.status(200).json({ comments })
  }

  if (req.method === 'POST') {
    const data = req.body as { text: string; userId: string; movieId: string }
    if (!data) return res.status(400).json({ message: 'No data provided.' })
    if (!data.text || !data.userId || !data.movieId)
      return res.status(400).json({ message: 'Text, userId and movieId are required.' })

    const { comment } = await createComment({ text: data.text, movieId: data.movieId, userId: data.userId })
    if (!comment) return res.status(500).json({ message: 'Comment was not created.' })
    return res.status(200).json({ comment })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
