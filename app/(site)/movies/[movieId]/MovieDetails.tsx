'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

interface MovieDetails {
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
  release_date: string
  revenue: number
  poster_path: string | null
  backdrop_path: string | null
}

interface MovieDetailsProps {
  results: MovieDetails
  imgURL: string
  MOVIES_DB_API_URL: string
  MOVIES_DB_API_KEY: string
}

export const MovieDetails = ({ results, imgURL }: MovieDetailsProps) => {
  const [movieDetailsData, setMovieDetailsData] = useState(results || {})

  useEffect(() => {
    return () => {
      setMovieDetailsData(results)
    }
  }, [results])

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
  })

  return (
    <>
      <Image
        className={'rounded-lg'}
        src={`${imgURL}/${movieDetailsData.poster_path}`}
        alt={''}
        width={500}
        height={500}
      ></Image>
      <h2 className={'text-4xl font-extrabold dark:text-white'}>{movieDetailsData.title}</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-2xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Movie Title:
              </th>
              <td className="px-6 py-4">{movieDetailsData.title}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Genres:
              </th>
              <td className="px-6 py-4">
                {movieDetailsData?.genres[0].name}
                {movieDetailsData?.genres[1] && ', ' + movieDetailsData.genres[1]?.name}
                {movieDetailsData?.genres[2] && ', ' + movieDetailsData.genres[2]?.name}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Overview
              </th>
              <td className="px-6 py-4">{movieDetailsData.overview}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Production companies:
              </th>
              <td className="px-6 py-4">
                {movieDetailsData?.production_companies[0].name}
                {movieDetailsData?.genres[1] && ', ' + movieDetailsData.production_companies[1]?.name}{' '}
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Release Date:
              </th>
              <td className="px-6 py-4">{movieDetailsData.release_date}</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Revenue:
              </th>
              <td className="px-6 py-4">{USDollar.format(movieDetailsData.revenue)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
