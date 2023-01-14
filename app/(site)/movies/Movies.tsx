'use client'

import React, { useCallback, useEffect, useState } from 'react'

import useDebounceValue from '@hooks/useDebounce'
import { useMovies } from '@hooks/useMovies'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Pagination } from './Pagination'
import Loading from './loading'

export interface Movie {
  id: number
  title: string
  name: string
  original_name: string
  original_title: string
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

export const Movies = ({
  totalResults,
  elementsPerPage,
  imgURL,
  MOVIES_DB_API_KEY,
  MOVIES_DB_API_URL,
}: MoviesProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [pageNum, setPageNum] = useState(Number(searchParams.get('page')) || 1)
  const { movies, isLoading } = useMovies(
    `${MOVIES_DB_API_URL}/trending/all/week?api_key=${MOVIES_DB_API_KEY}&page=${pageNum}`
  )

  const [moviesData, setMoviesData] = useState(movies)

  const handleNextPage = useCallback(() => {
    if (pageNum < totalResults / elementsPerPage) {
      setPageNum(pageNum + 1)
      router.push(`/movies?page=${pageNum + 1}`)
    }
  }, [pageNum, totalResults, elementsPerPage, router])

  const handlePrevPage = useCallback(() => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
      router.push(`/movies?page=${pageNum - 1}`)
    }
  }, [pageNum, router])

  useEffect(() => {
    setMoviesData(movies)
  }, [movies])

  const [search, setSearch] = useState(searchParams.get('query') || '')
  const debouncedSearch = useDebounceValue(search, 500)

  useEffect(() => {
    if (search === '') {
      setMoviesData(movies)
    }
  }, [search, movies])

  const { movies: moviesByQuery } = useMovies(
    debouncedSearch ? `${MOVIES_DB_API_URL}/search/movie?api_key=${MOVIES_DB_API_KEY}&query=${debouncedSearch}` : null
  )

  useEffect(() => {
    if (moviesByQuery) {
      setMoviesData(moviesByQuery)
      router.push(`/movies?query=${debouncedSearch}`)
    }
  }, [debouncedSearch, moviesByQuery, router])

  return (
    <div>
      <div className="md:flex justify-between">
        <h1 className="font-bold text-6xl py-5 ml-0 sm:ml-20 lg:ml-10 dark:text-white">Movies </h1>
        <form className="items-center flex mr-0 sm:ml-20 lg:mr-10 md:mr-20 mb-8 md:mb-0">
          <div className="relative w-full mr-0 sm:mr-20 md:mr-0 md:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Movies"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} top />
      {!isLoading ? (
        <div className="grid grid-cols-1 sm:px-20 lg:grid-cols-2 3xl:grid-cols-3 lg:px-10 px-0 gap-5 py-5 justify-center items-center">
          {moviesData &&
            moviesData?.map((movie: Movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="lg:min-h-[290px] flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Image
                  className="object-contain w-full rounded-lg h-96 lg:h-auto lg:w-48 lg:rounded-none lg:rounded-l-lg"
                  src={movie.poster_path ? `${imgURL}/${movie.poster_path}` : '/image-placeholder.png'}
                  alt=""
                  width={500}
                  height={500}
                  placeholder="blur"
                  blurDataURL={'/image-placeholder.png'}
                />
                <div className="flex flex-col justify-between p-4 leading-normal lg:max-h-64 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {movie.title || movie.name || movie.original_title || movie.original_name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 lg:overflow-hidden">
                    {movie.overview}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <Loading />
      )}

      <div className="flex flex-col items-center pb-5 mt-2">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageNum * elementsPerPage - elementsPerPage + 1}
          </span>{' '}
          to <span className="font-semibold text-gray-900 dark:text-white">{pageNum * elementsPerPage}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> Entries
        </span>
        <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
      </div>
    </div>
  )
}
