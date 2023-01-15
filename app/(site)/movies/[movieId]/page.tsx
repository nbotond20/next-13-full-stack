import React from 'react'

import { MovieDetails } from '@app/(site)/movies/[movieId]/MovieDetails'

async function getData() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/76600?api_key=ef5bcb74a71ef45e328044508e862712`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!

  const data = await getData()

  return <MovieDetails results={data} imgURL={imgURL} />
}
