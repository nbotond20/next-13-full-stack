'use client'

import React, { useEffect, useState } from 'react'

import { User } from '@prisma/client'
import { Dropdown } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export interface Comment {
  id: string
  user: User
  userId: string
  text: string
  movieId: string
  createdAt: Date | number
}

interface CommentSectionProps {
  commentsProp: Comment[]
  movieid: string
}

export const CommentSection = ({ commentsProp, movieid }: CommentSectionProps) => {
  //const [isModalOpen, setIsModalOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>(commentsProp)
  //const [editComment, setEditComment] = useState<Comment>()
  const [newCommentValues, setNewCommentValues] = useState({ text: '', userId: '', movieId: '' })
  const [authUserId, setAuthUserId] = useState<string>('00000000')
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      if (!(typeof session?.user?.email == 'undefined')) {
        const response = await fetch(`/api/users/emailToId/${session?.user?.email}`)
        const retrievedUserId = await response.json()
        setAuthUserId(retrievedUserId.user?.id)
      }
    }

    fetchData().then()
  }, [session])

  if (!comments) {
    return <div>Loading...</div>
  }

  const handleCommentPost = async () => {
    const res = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(newCommentValues),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      const { comment: newC } = await res.json()
      comments.push(newC)
      setComments(comments)
    }
  }

  const handleDeleteComment = async (commentId?: string) => {
    if (!commentId) return
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      const indToDelete = comments.findIndex(comment => comment.id === commentId)
      if (indToDelete > -1) {
        const delComments = comments.filter(comment => comment.id !== commentId)
        setComments(delComments)
      }
      //setIsModalOpen(false)
      //setComments(comments)
    }
  }

  const handleEditComment = async (commentId: string) => {
    commentId.length
    return true
  }

  /*const handleSaveComment = async (commentId?: string) => {
    if (!commentId) return
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editComment),
    })

    if (res.status === 200) {
      const indToEdit = comments.findIndex(comment => comment.id === commentId)
      if (indToEdit > -1) {
        const delComments = comments.filter(comment => comment.id !== commentId)
        setComments(delComments)
      }
      setIsModalOpen(false)
      //setComments(comments)
    }
  }*/

  const handleTextChange = (e: { target: { value: string } }) => {
    setNewCommentValues({ text: e.target.value, movieId: movieid, userId: authUserId })
  }

  const disableOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h2>{' '}
        </div>
        <form className="mb-6" onSubmit={disableOnSubmit}>
          {' '}
          {/* Write a comment */}
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              onChange={handleTextChange}
              required
            ></textarea>
          </div>
          <button
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            onClick={handleCommentPost}
          >
            Post comment
          </button>
        </form>
        {comments &&
          comments.map((comment: Comment) => (
            <article key={comment.id} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
              {' '}
              {/* Comment */}
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {/*FIXME: Google Profile images only work sometiemes */}
                    {comment.user?.image && (
                      <Image
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`${comment.user?.image}`}
                        alt={`${comment.user?.name}`}
                        width={500}
                        height={500}
                      ></Image>
                    )}
                    {comment.user?.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-02-08" title="February 8th, 2022">
                      {comment.createdAt.toString()}
                    </time>
                  </p>
                </div>
                {/* Dropdown Menu */}
                {session?.user?.name === comment.user?.name && (
                  <Dropdown dismissOnClick={false} pill={true} label={''} color={''}>
                    <Dropdown.Item onClick={() => handleEditComment(comment.id)} aria-disabled={true}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteComment(comment.id)}>Remove</Dropdown.Item>
                  </Dropdown>
                )}
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
            </article>
          ))}
      </div>
    </section>
  )
}
