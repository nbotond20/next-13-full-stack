import React from 'react'

import { MovieDetails } from '@app/(site)/movies/[movieId]/MovieDetails'
import { getCommentsByMovieId } from '@lib/prisma/comments'
import { getRatingsByMovieId } from '@lib/prisma/ratings'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

import { IComment } from './Comment'

export default async function Page({ params }: { params: { movieId: string } }) {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!
  const MOVIES_DB_API_URL = process.env.MOVIES_DB_API_URL!
  const MOVIES_DB_API_KEY = process.env.MOVIES_DB_API_KEY!

  const { comments } = await getCommentsByMovieId({
    movieId: params.movieId,
  })
  const { ratings } = await getRatingsByMovieId({
    movieId: params.movieId,
  })

  const session = await unstable_getServerSession(authOptions)

  const commentsToPass: IComment[] = comments?.map(c => ({
    ...c,
    date: new Date(c.date).toISOString(),
  })) as IComment[]

  return (
    <MovieDetails
      imgURL={imgURL}
      movieId={params.movieId}
      MOVIES_DB_API_URL={MOVIES_DB_API_URL}
      MOVIES_DB_API_KEY={MOVIES_DB_API_KEY}
      comments={commentsToPass || []}
      ratings={ratings || []}
      user={session?.user}
    />
  )
}
