'use client'

import React from 'react'

import { useMovie } from '@hooks/useMovie'
import { Rating } from 'flowbite-react'
import Image from 'next/image'

export interface MovieDetails {
  id: number
  title: string
  genres: {
    id: number
    name: string
  }[]

  original_title: string | null
  overview: string | null
  production_companies: {
    name: string
  }[]
  runtime: number
  release_date: string
  revenue: number
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
}

interface MovieDetailsProps {
  imgURL: string
  movieId: string
  MOVIES_DB_API_URL: string
  MOVIES_DB_API_KEY: string
}

export const MovieDetails = ({ imgURL, movieId, MOVIES_DB_API_URL, MOVIES_DB_API_KEY }: MovieDetailsProps) => {
  const { movie } = useMovie(movieId ? `${MOVIES_DB_API_URL}movie/${movieId}?api_key=${MOVIES_DB_API_KEY}` : null)

  if (!movie) {
    return <div>Loading...</div>
  }

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
  })

  const avg = Math.round(movie.vote_average * 100) / 100 / 2
  const rating = [false, false, false, false, false] //FIXME: could be MUCH nicer
  rating[0] = avg > 1
  rating[1] = avg > 2
  rating[2] = avg > 3
  rating[3] = avg > 4
  rating[4] = avg > 4.5

  return (
    <div className={'grid lg:grid-rows-3 lg:grid-flow-col gap-4 pt-10'}>
      <Image
        className={'rounded-lg lg:row-span-3 self-center justify-self-center'}
        src={`${imgURL.slice(0, -1)}${movie.poster_path}`}
        alt={''}
        width={500}
        height={500}
      />
      <div className="lg:col-span-2 self-center justify-self-center">
        <h2 className={'text-4xl font-extrabold dark:text-white self-center justify-self-center'}>{movie.title}</h2>
        <Rating className={'self-center justify-self-center'}>
          <Rating.Star filled={rating[0]} />
          <Rating.Star filled={rating[1]} />
          <Rating.Star filled={rating[2]} />
          <Rating.Star filled={rating[3]} />
          <Rating.Star filled={rating[4]} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{avg} out of 5</p>
        </Rating>
      </div>

      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg max-w-2xl lg:row-span-2 lg:col-span-2 self-center justify-self-center">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Movie Title:
              </th>
              <td className="px-6 py-4">{movie.title}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Genres:
              </th>
              <td className="px-6 py-4">
                {movie.genres?.map((genre, index) => genre.name + (index !== movie.genres.length - 1 ? ', ' : ''))}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Overview
              </th>
              <td className="px-6 py-4">{movie.overview}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {/*<th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Production companies:
              </th>
              <td className="px-6 py-4">
                {movie.production_companies.map(
                  (genre, index) => genre.name + (index !== movie.production_companies.length - 1 ? ', ' : '')
                )}
              </td>*/}
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Runtime:
              </th>
              <td className="px-6 py-4">{movie.runtime} minutes</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Release Date:
              </th>
              <td className="px-6 py-4">{movie.release_date}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Revenue:
              </th>
              <td className="px-6 py-4">{USDollar.format(movie.revenue || 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
