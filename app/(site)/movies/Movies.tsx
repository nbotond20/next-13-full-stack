'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
}

interface MoviesProps {
  results: Movie[]
  totalResults: number
  page: number
  elementsPerPage: number
  imgURL: string
}

export const Movies = ({ page, totalResults, results, elementsPerPage, imgURL }: MoviesProps) => {
  return (
    <div>
      <h1 className="font-bold text-6xl py-5 ml-28">Movies</h1>
      <div className="grid grid-cols-3 gap-5 py-5 px-28 justify-center">
        {results &&
          results.map((movie: Movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Image
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={`${imgURL}/${movie.poster_path}`}
                alt=""
                width={500}
                height={500}
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
              </div>
            </Link>
          ))}
      </div>

      <div className="flex flex-col items-center pb-5">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {page * elementsPerPage - elementsPerPage + 1}
          </span>{' '}
          to <span className="font-semibold text-gray-900 dark:text-white">{page * elementsPerPage}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
