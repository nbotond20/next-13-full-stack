import { Rating, Comment } from '@prisma/client'

import prisma from './prismadb'

export async function getMovies() {
  try {
    const movies = await prisma.movie.findMany()
    return { movies }
  } catch (error) {
    return { error }
  }
}

export async function getMovieById(id: string) {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
    })
    return { movie }
  } catch (error) {
    return { error }
  }
}

export async function createRating(rating: { rating: number; movieId: string; userId: string }) {
  try {
    const newRating = await prisma.rating.create({
      data: rating,
    })
    return { rating: newRating }
  } catch (error) {
    return { error }
  }
}

export async function updateRating(rating: Rating) {
  try {
    const updatedRating = await prisma.rating.update({
      where: { id: rating.id },
      data: rating,
    })
    return { rating: updatedRating }
  } catch (error) {
    return { error }
  }
}

export async function deleteRating(id: string) {
  try {
    const deletedRating = await prisma.rating.delete({
      where: { id },
    })
    return { rating: deletedRating }
  } catch (error) {
    return { error }
  }
}

export async function getCommentsForMovie(movieId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { movieId },
    })
    return { comments }
  } catch (error) {
    return { error }
  }
}

export async function createComment(comment: { text: string; movieId: string; userId: string }) {
  try {
    const newComment = await prisma.comment.create({
      data: comment,
    })
    return { comment: newComment }
  } catch (error) {
    return { error }
  }
}

export async function updateComment(comment: Comment) {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: comment.id },
      data: comment,
    })
    return { comment: updatedComment }
  } catch (error) {
    return { error }
  }
}

export async function deleteComment(id: string) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id },
    })
    return { comment: deletedComment }
  } catch (error) {
    return error
  }
}

export async function createLike(like: { userId: string; commentId: string }) {
  try {
    const newLike = await prisma.like.create({
      data: like,
    })
    return { like: newLike }
  } catch (error) {
    return { error }
  }
}

export async function deleteLike(id: string) {
  try {
    const deletedLike = await prisma.like.delete({
      where: { id },
    })
    return { like: deletedLike }
  } catch (error) {
    return { error }
  }
}
