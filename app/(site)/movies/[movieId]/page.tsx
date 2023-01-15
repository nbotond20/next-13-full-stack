import React from 'react'

import { MovieDetails, MovieDetailsProps } from './MovieDetails'

async function getData({ movieId }: { movieId: string }) {
  const res = await fetch(`${process.env.MOVIES_DB_API_URL!}movie/${movieId}?api_key=${process.env.MOVIES_DB_API_KEY!}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json()
}

const Page = async ({ params }: { params: { movieId: string } }) => {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!

  const data = await getData({ movieId: params.movieId })
  const movieDetails: MovieDetailsProps = {
    results: data,
    imgURL: imgURL,
  }

  return <MovieDetails {...movieDetails} />
}

export default Page
