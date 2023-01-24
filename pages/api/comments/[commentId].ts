import { deleteComment, getCommentById } from '@db/movies'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { commentId } = req.query
    const { comment } = await getCommentById(commentId as string)
    if (!comment) {
      return res.status(404).json({ message: `Comment with id ${comment} was not found.` })
    }

    const deletedComment = await deleteComment(commentId as string)

    if (!deletedComment) {
      return res.status(500).json({ message: `Comment with id ${commentId} could not be deleted.` })
    }

    return res.status(200).json(deletedComment)
  }
}

export default handler
