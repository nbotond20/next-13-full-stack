import { getCommentById, updateCommentVote } from '@lib/prisma/comments'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, commentId } = req.body as { userId: string; commentId: string }
    const { comment } = await getCommentById({ commentId })
    if (!comment) {
      return res.status(404).json({ message: `Comment with id ${commentId} was not found.` })
    }

    if (comment.likedBy.includes(`${userId}:1`)) {
      return res.status(409).json({ message: `You already liked this comment.` })
    }

    if (comment.likedBy.includes(`${userId}:-1`)) {
      comment.likedBy = comment.likedBy.filter(like => !like.includes(`${userId}:-1`))
      comment.likedBy.push(`${userId}:1`)
      comment.voteCount += 2
    } else {
      comment.likedBy.push(`${userId}:1`)
      comment.voteCount++
    }

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
