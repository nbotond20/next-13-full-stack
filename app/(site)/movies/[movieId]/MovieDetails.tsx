'use client'

import React, { useCallback } from 'react'

import { useMovie } from '@hooks/useMovie'
import Rating from '@mui/material/Rating'
import { Rating as PrismaRating } from '@prisma/client'
import { User } from 'next-auth'
import Image from 'next/image'

import { Comment, IComment } from './Comment'

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
  release_date: string
  revenue: number
  poster_path: string | null
  backdrop_path: string | null
}

interface MovieDetailsProps {
  imgURL: string
  movieId: string
  MOVIES_DB_API_URL: string
  MOVIES_DB_API_KEY: string
  comments: IComment[]
  ratings: PrismaRating[]
  user?: User
}

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
})

const sortCommentsByDate = (comments: IComment[]) => {
  return comments.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

const sortCommentsByDescDate = (comments: IComment[]) => {
  return comments.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

export const MovieDetails = ({
  imgURL,
  movieId,
  MOVIES_DB_API_URL,
  MOVIES_DB_API_KEY,
  comments,
  ratings,
  user,
}: MovieDetailsProps) => {
  const { movie } = useMovie(movieId ? `${MOVIES_DB_API_URL}movie/${movieId}?api_key=${MOVIES_DB_API_KEY}` : null)

  const [comment, setComment] = React.useState('')
  const [commentsToDisplay, setCommentsToDisplay] = React.useState<IComment[]>(sortCommentsByDate(comments) || [])

  const [rating, setRating] = React.useState<number | null>(null)
  const [ratingsToDisplay, setRatingsToDisplay] = React.useState<PrismaRating[]>(ratings || [])
  const [userRating, setUserRating] = React.useState<PrismaRating | undefined>(
    ratingsToDisplay.find(r => r.userId === user?.id)
  )
  const [voteValue, setVoteValue] = React.useState<number | null>(userRating ? userRating.rating : null)

  React.useEffect(() => {
    if (ratingsToDisplay.length > 0) {
      const total = ratingsToDisplay.reduce((acc, curr) => {
        return acc + curr.rating
      }, 0)
      setRating(total / ratingsToDisplay.length)
    }
  }, [ratingsToDisplay])

  const handleNewComment = async (parentId?: string, reply?: string) => {
    if (comment === '' && reply === '') return
    if (!user) return

    const res = await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId,
        text: reply || comment,
        userId: user.id,
        avatar: user.image,
        name: user.name,
        parentId: parentId || null,
        date: Date.now(),
        voteCount: 0,
        likedBy: [],
      }),
    })

    if (res.status === 201) {
      const { newComment } = await res.json()
      setCommentsToDisplay([newComment.newComment, ...commentsToDisplay])
      setComment('')
    }
  }

  const handleNewRating = useCallback(
    async (newValue: number | null) => {
      if (!user || !newValue) return

      const res = await fetch(`/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
          rating: newValue,
          userId: user.id,
        }),
      })

      if (res.status === 201) {
        const { newRating } = await res.json()
        setRatingsToDisplay([newRating.rating, ...ratingsToDisplay])
        setUserRating(newRating.rating)
      }
    },
    [movieId, ratingsToDisplay, user]
  )

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!user) return

      const res = await fetch(`/api/comments`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
        }),
      })

      if (res.status === 200) {
        const { parentId } = await res.json()
        setCommentsToDisplay(prev => prev.filter(c => c.id !== parentId))
      }
    },
    [user]
  )

  const handleEditComment = useCallback(
    async (commentId: string, text: string) => {
      if (!user) return

      const res = await fetch(`/api/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          text,
        }),
      })

      if (res.status === 200) {
        const { updatedComment } = await res.json()
        setCommentsToDisplay(prev => prev.map(c => (c.id === updatedComment.id ? updatedComment : c)))
      }
    },
    [user]
  )

  if (!movie || status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={'flex flex-col gap-4 pt-10'}>
        <Image
          className={'rounded-lg row-span-3 md:col-span-3 self-center justify-self-center'}
          src={`${imgURL.slice(0, -1)}${movie.poster_path}`}
          alt={''}
          width={500}
          height={500}
        />
        <h2 className={'text-4xl font-extrabold dark:text-white col-span-2 self-center justify-self-center'}>
          {movie?.title}
        </h2>
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg max-w-2xl row-span-2 col-span-2 self-center justify-self-center">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3">
                  <Rating
                    readOnly={userRating ? true : false}
                    precision={0.5}
                    name="simple-controlled"
                    value={voteValue}
                    onChange={(_, newValue) => {
                      handleNewRating(newValue)
                      setVoteValue(newValue)
                    }}
                  />
                </th>
                <th scope="row" className="px-6 py-3">
                  <div className="flex items-center w-full justify-end">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Rating star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{rating || 0}</p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {ratingsToDisplay.length} reviews
                    </span>
                  </div>
                </th>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Movie Title:
                </th>
                <td className="px-6 py-4">{movie?.title}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Genres:
                </th>
                <td className="px-6 py-4">
                  {movie?.genres?.map((genre, index) => genre.name + (index !== movie.genres.length - 1 ? ', ' : ''))}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Overview
                </th>
                <td className="px-6 py-4">{movie.overview}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Production companies:
                </th>
                <td className="px-6 py-4">
                  {movie?.production_companies?.map(
                    (genre, index) => genre.name + (index !== movie?.production_companies.length - 1 ? ', ' : '')
                  )}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Release Date:
                </th>
                <td className="px-6 py-4">{movie?.release_date}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Revenue:
                </th>
                <td className="px-6 py-4">{USDollar.format(movie?.revenue || 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Comment section */}
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({commentsToDisplay?.length || 0})
            </h2>
          </div>
          {user && (
            <div className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <textarea
                  id="comment"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>
              <button
                onClick={() => handleNewComment()}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            </div>
          )}
          {commentsToDisplay.map((comment, idx) => {
            if (comment.parentId === null) {
              const children = sortCommentsByDescDate(commentsToDisplay.filter(child => child.parentId === comment.id))
              return (
                <React.Fragment key={comment.id}>
                  <Comment
                    root
                    newSection={idx !== 0}
                    comment={comment}
                    handleNewComment={handleNewComment}
                    user={user}
                    handleDeleteComment={handleDeleteComment}
                    handleEditComment={handleEditComment}
                  />
                  {children.map(child => (
                    <Comment
                      comment={child}
                      key={child.id}
                      user={user}
                      handleDeleteComment={handleDeleteComment}
                      handleEditComment={handleEditComment}
                    />
                  ))}
                </React.Fragment>
              )
            }
          })}
        </div>
      </section>
    </>
  )
}
