import { getMostRecentComments } from '@db/movies'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { comments } = await getMostRecentComments()
    if (!comments) {
      return res.status(404).json({ message: 'Most recent comments not found' })
    }
    return res.status(200).json({ comments })
  }
}

export default handler
