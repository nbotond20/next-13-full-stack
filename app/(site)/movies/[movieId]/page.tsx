import React from 'react'

import { MovieDetails } from '@app/(site)/movies/[movieId]/MovieDetails'

export default async function Page({ params }: { params: { movieId: string } }) {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!
  const MOVIES_DB_API_URL = process.env.MOVIES_DB_API_URL!
  const MOVIES_DB_API_KEY = process.env.MOVIES_DB_API_KEY!

  return (
    <MovieDetails
      imgURL={imgURL}
      movieId={params.movieId}
      MOVIES_DB_API_URL={MOVIES_DB_API_URL}
      MOVIES_DB_API_KEY={MOVIES_DB_API_KEY}
    />
  )
}
