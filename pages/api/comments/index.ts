import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByMovieId,
  getCommentsByParentId,
  updateComment,
} from '@lib/prisma/comments'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { userId, movieId } = req.query as { userId: string; movieId: string }
    if (!userId || !movieId) return res.status(400).json({ message: 'User and movie are required.' })
    const { comments } = await getCommentsByMovieId({ movieId })
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

  if (req.method === 'DELETE') {
    const { commentId } = req.body as { commentId: string }
    if (!commentId) {
      return res.status(400).json({ message: 'Comment ID are required.' })
    }

    const { comment } = await getCommentById({ commentId })
    if (!comment) return res.status(404).json({ message: 'Comment not found.' })

    const deletedComments = []

    const { comments: childComments } = await getCommentsByParentId({ parentId: comment.id })
    if (childComments && childComments.length > 0) {
      for (let index = 0; index < childComments.length; index++) {
        const childComment = childComments[index]
        const { deletedComment } = await deleteComment({ commentId: childComment.id })
        deletedComments.push(deletedComment)
      }
    }

    const { deletedComment } = await deleteComment({ commentId })
    deletedComments.push(deletedComment)
    return res.status(200).json({ deletedComments, parentId: commentId })
  }

  if (req.method === 'PUT') {
    const { commentId, text } = req.body as { commentId: string; text: string }
    if (!commentId || !text) {
      return res.status(400).json({ message: 'Comment ID and text are required.' })
    }

    const { comment } = await getCommentById({ commentId })
    if (!comment) return res.status(404).json({ message: 'Comment not found.' })

    const { updatedComment } = await updateComment({ commentId, text })

    if (!updatedComment) return res.status(400).json({ message: 'Comment could not be updated.' })

    return res.status(200).json({ updatedComment })
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT'])
  res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
