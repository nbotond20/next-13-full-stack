import { getMovieById } from '@db/movies'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { movieId } = req.query
    const { movie } = await getMovieById(movieId as string)
    if (!movie) {
      return res.status(404).json({ message: `Movie with id ${movieId} was not found.` })
    }
    return res.status(200).json({ movie })
  }
}

export default handler
