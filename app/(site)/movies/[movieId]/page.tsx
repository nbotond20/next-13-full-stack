import React from 'react'

import { CommentSection } from '@app/(site)/movies/[movieId]/CommentSection'
import { MovieDetails } from '@app/(site)/movies/[movieId]/MovieDetails'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Page({ params }: { params: { movieId: string } }) {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!
  const MOVIES_DB_API_URL = process.env.MOVIES_DB_API_URL!
  const MOVIES_DB_API_KEY = process.env.MOVIES_DB_API_KEY!
  const comments = await prisma.comment.findMany({
    where: {
      movieId: params.movieId,
    },
    include: {
      user: true,
    },
  })

  return (
    <>
      <MovieDetails
        imgURL={imgURL}
        movieId={params.movieId}
        MOVIES_DB_API_URL={MOVIES_DB_API_URL}
        MOVIES_DB_API_KEY={MOVIES_DB_API_KEY}
      />
      <CommentSection comments={comments}></CommentSection>
    </>
  )
}
