import prisma from './prismadb'

export async function getCommentsByMovieId({ movieId }: { movieId: string }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { movieId },
    })
    return { comments }
  } catch (error) {
    return { error }
  }
}

export async function getCommentsByParentId({ parentId }: { parentId: string }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { parentId },
    })
    return { comments }
  } catch (error) {
    return { error }
  }
}

export async function createComment({
  userId,
  movieId,
  text,
  date,
  parentId,
  avatar,
  name,
  voteCount,
  likedBy,
}: {
  userId: string
  movieId: string
  text: string
  date: Date
  parentId: string
  avatar: string
  name: string
  voteCount: number
  likedBy: string[]
}) {
  try {
    const newComment = await prisma.comment.create({
      data: { userId, movieId, text, date: new Date(date), parentId, avatar, name, voteCount, likedBy },
    })

    if (!newComment) {
      return { error: 'Comment not created' }
    }

    return { newComment }
  } catch (error) {
    return { error }
  }
}

export async function getCommentById({ commentId }: { commentId: string }) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })
    return { comment }
  } catch (error) {
    return { error }
  }
}

export async function updateCommentVote({
  commentId,
  voteCount,
  likedBy,
}: {
  commentId: string
  voteCount: number
  likedBy: string[]
}) {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { voteCount, likedBy },
    })

    if (!updatedComment) {
      return { error: 'Comment not updated' }
    }

    return { updatedComment }
  } catch (error) {
    return { error }
  }
}

export async function deleteComment({ commentId }: { commentId: string }) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    })

    if (!deletedComment) {
      return { error: 'Comment not deleted' }
    }

    return { deletedComment }
  } catch (error) {
    return { error }
  }
}

export async function updateComment({ commentId, text }: { commentId: string; text: string }) {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    })

    if (!updatedComment) {
      return { error: 'Comment not updated' }
    }

    return { updatedComment }
  } catch (error) {
    return { error }
  }
}
