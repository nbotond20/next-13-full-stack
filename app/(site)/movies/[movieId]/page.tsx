import React from 'react'

import { MovieDetails } from '@app/(site)/movies/[movieId]/MovieDetails'

async function getData({ movieId }: { movieId: string }) {
  const res = await fetch(`${process.env.MOVIES_DB_API_URL}/movie/${movieId}?api_key=${process.env.MOVIES_DB_API_KEY}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }: { params: { movieId: string } }) {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!
  const MOVIES_DB_API_URL = process.env.MOVIES_DB_API_URL!
  const MOVIES_DB_API_KEY = process.env.MOVIES_DB_API_KEY!

  const data = await getData({ movieId: params.movieId })

  return (
    <MovieDetails
      results={data}
      imgURL={imgURL}
      MOVIES_DB_API_URL={MOVIES_DB_API_URL}
      MOVIES_DB_API_KEY={MOVIES_DB_API_KEY}
    ></MovieDetails>
  )
}
