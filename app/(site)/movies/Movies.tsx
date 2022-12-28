import React from 'react'

import Image from 'next/image'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
}

export const Movies = async () => {
  const { results } = await fetch(
    `${process.env.MOVIES_DB_API_URL}/trending/all/week?api_key=${process.env.MOVIES_DB_API_KEY}&page=1`
  ).then(res => res.json())

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {results &&
          results.map((movie: Movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <Image
                src={`${process.env.MOVIES_DB_API_IMAGE_URL}/${movie.poster_path}`}
                width={100}
                height={150}
                alt=""
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
