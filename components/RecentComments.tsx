import React, { useEffect, useState } from 'react'

import { Comment } from '@app/(site)/movies/[movieId]/CommentSection'
import Image from 'next/image'

/*interface RecentCommentProps {
  comments: Comment[]
}*/

export const RecentComments = () => {
  const [comments, setComments] = useState<Comment[]>([])
  useEffect(() => {
    const getResult = async () => {
      const response = await fetch('/api/comments')
      const results = await response.json()
      results.comments.map(async (comment: { movieId: string; movieName: string }) => {
        const movieNameResponse = await fetch(`/api/movies/${comment.movieId}`)
        const movieNameResult = await movieNameResponse.json()
        comment.movieName = movieNameResult.name
      })
      setComments(results.comments)
    }

    getResult()
  }, [])

  if (!comments) {
    return <div>Loading...</div>
  }

  return (
    <>
      {comments &&
        comments.map((comment: Comment) => (
          <figure key={comment.id} className="max-w-screen-md mx-auto text-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 dark:text-white">&quot;{comment.text}&quot;</p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              {comment.user.image && (
                <Image
                  className="mr-2 w-6 h-6 rounded-full"
                  src={`${comment.user.image}`}
                  alt={`${comment.user.name}`}
                  width={500}
                  height={500}
                ></Image>
              )}
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <cite className="pr-3 font-medium text-gray-900 dark:text-white">{comment.user.name}</cite>
                <cite className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{comment.movieId}</cite>
              </div>
            </figcaption>
          </figure>
        ))}
    </>
  )
}
