import prisma from './prismadb'

export async function getComments({ userId, movieId }: { userId: string; movieId: string }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { userId, movieId },
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
      data: { userId, movieId, text, date, parentId, avatar, name, voteCount, likedBy },
    })
    return { newComment }
  } catch (error) {
    return { error }
  }
}
