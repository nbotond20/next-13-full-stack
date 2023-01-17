import prisma from './prismadb'

export async function getRatingsByMovieId({ movieId }: { movieId: string }) {
  try {
    const ratings = await prisma.rating.findMany({
      where: { movieId },
    })
    return { ratings }
  } catch (error) {
    return { error }
  }
}

export async function createRating(rating: { userId: string; movieId: string; rating: number }) {
  try {
    const newRating = await prisma.rating.create({
      data: rating,
    })
    return { rating: newRating }
  } catch (error) {
    return { error }
  }
}
