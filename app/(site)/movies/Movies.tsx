'use client'

import React, { useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

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
  MOVIES_DB_API_URL: string
  MOVIES_DB_API_KEY: string
}
const fetcher = (url: string) => fetch(url).then(res => res.json())

function useMovies(page: number, MOVIES_DB_API_URL: string, MOVIES_DB_API_KEY: string) {
  const { data, error, isLoading } = useSWR(
    `${MOVIES_DB_API_URL}trending/all/week?api_key=${MOVIES_DB_API_KEY}&page=${page}`,
    fetcher
  )

  return {
    movies: data?.results,
    isLoading,
    error,
  } as { movies: Movie[]; isLoading: boolean; error: Error }
}

export const Movies = ({
  totalResults,
  elementsPerPage,
  imgURL,
  MOVIES_DB_API_KEY,
  MOVIES_DB_API_URL,
}: MoviesProps) => {
  const [pageNum, setPageNum] = React.useState(1)
  const { movies } = useMovies(pageNum, MOVIES_DB_API_URL, MOVIES_DB_API_KEY)

  const [moviesData, setMoviesData] = React.useState(movies)

  const handleNextPage = useCallback(() => {
    if (pageNum < totalResults / elementsPerPage) {
      setPageNum(pageNum + 1)
    }
  }, [pageNum, totalResults, elementsPerPage])

  const handlePrevPage = useCallback(() => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
    }
  }, [pageNum])

  React.useEffect(() => {
    setMoviesData(movies)
  }, [movies])

  return (
    <div>
      <h1 className="font-bold text-6xl py-5 ml-0 sm:ml-20 lg:ml-10 dark:text-white">Movies</h1>
      <div className="grid grid-cols-1 sm:px-20 lg:grid-cols-2 3xl:grid-cols-3 lg:px-10 px-0 gap-5 py-5 justify-center items-center">
        {moviesData &&
          moviesData?.map((movie: Movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Image
                className="object-cover w-full rounded-t-lg h-96 lg:h-auto lg:w-48 lg:rounded-none lg:rounded-l-lg"
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

      <div className="flex flex-col items-center pb-5 mt-2">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageNum * elementsPerPage - elementsPerPage + 1}
          </span>{' '}
          to <span className="font-semibold text-gray-900 dark:text-white">{pageNum * elementsPerPage}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => handlePrevPage()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
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
          <button
            onClick={() => handleNextPage()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
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
