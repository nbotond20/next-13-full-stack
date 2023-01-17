import { getCommentById, updateCommentVote } from '@lib/prisma/comments'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, commentId } = req.body as { userId: string; commentId: string }
    const { comment } = await getCommentById(commentId as string)

    if (!comment) {
      return res.status(404).json({ message: `Comment with id ${commentId} was not found.` })
    }

    if (!comment.likedBy.includes(`${userId}:1`) && !comment.likedBy.includes(`${userId}:-1`)) {
      return res.status(409).json({ message: `You haven't voted on this comment.` })
    }

    const vote = Number(
      comment.likedBy.find(like => like.includes(`${userId}:-1`) || like.includes(`${userId}:1`))?.split(':')[1]
    )

    comment.voteCount -= vote
    comment.likedBy = comment.likedBy.filter(like => !like.includes(`${userId}:-1`) && !like.includes(`${userId}:1`))

    const updatedComment = await updateCommentVote({
      commentId: commentId as string,
      voteCount: comment.voteCount,
      likedBy: comment.likedBy,
    })

    return res.status(201).json({ updatedComment })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
