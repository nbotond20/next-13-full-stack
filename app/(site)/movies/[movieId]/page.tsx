import React from 'react'

import { MovieDetails, MovieDetailsProps } from '@app/(site)/movies/[movieId]/MovieDetails'

async function getData({
  movieId,
  MOVIES_DB_API_URL,
  MOVIES_DB_API_KEY,
}: {
  movieId: string
  MOVIES_DB_API_URL: string
  MOVIES_DB_API_KEY: string
}) {
  const res = await fetch(`${MOVIES_DB_API_URL}movie/${movieId}?api_key=${MOVIES_DB_API_KEY}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }: { params: { movieId: string } }) {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!
  const MOVIES_DB_API_URL = process.env.MOVIES_DB_API_URL!
  const MOVIES_DB_API_KEY = process.env.MOVIES_DB_API_KEY!

  const data = await getData({ movieId: params.movieId, MOVIES_DB_API_URL, MOVIES_DB_API_KEY })
  const movieDetails: MovieDetailsProps = {
    results: data,
    imgURL: imgURL,
  }

  return <MovieDetails {...movieDetails} />
}
