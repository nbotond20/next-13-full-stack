import React, { useCallback, useMemo } from 'react'

import { formatDate } from '@lib/utils/formatDate'
import { User } from 'next-auth'
import Image from 'next/image'

export interface IComment {
  id: string
  name: string
  date: string
  avatar: string
  text: string
  parentId: string | null
  userId: string
  voteCount: number
  likedBy: string[]
}

interface CommentProps {
  root?: boolean
  newSection?: boolean
  comment: IComment
  handleNewComment?: (parentId?: string, reply?: string) => void
  user?: User
  handleDeleteComment?: (commentId: string) => void
  handleEditComment?: (commentId: string, text: string) => void
}

export const Comment = ({
  root,
  newSection,
  comment,
  handleNewComment,
  user,
  handleDeleteComment,
  handleEditComment,
}: CommentProps) => {
  const [replying, setReplying] = React.useState(false)
  const [reply, setReply] = React.useState('')

  const previousVote = useMemo(() => {
    if (!user) return
    if (comment.likedBy.includes(`${user.id}:1`)) return 1
    if (comment.likedBy.includes(`${user.id}:-1`)) return -1
    return null
  }, [comment.likedBy, user])

  const [voteValue, setVoteValue] = React.useState<number | null>(previousVote || null)
  const [voteCount, setVoteCount] = React.useState(comment.voteCount)

  const handleCommentVote = useCallback(
    async (vote: number) => {
      if (!user) return

      let url

      if (vote === 1) {
        url = `/api/comments/like`
      } else if (vote === -1) {
        url = `/api/comments/dislike`
      } else if (vote === 0) {
        url = `/api/comments/removeVote`
      }

      if (!url) return

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          commentId: comment.id,
        }),
      })
    },
    [comment.id, user]
  )

  const handleVote = useCallback(
    (vote: number) => {
      if (!user) return
      if (voteValue === vote) {
        setVoteValue(null)
        handleCommentVote(0)
        setVoteCount(prev => prev - vote)
      } else {
        if (voteValue === 1) {
          setVoteCount(prev => prev - 2)
        }
        if (voteValue === -1) {
          setVoteCount(prev => prev + 2)
        }
        if (voteValue === null) {
          setVoteCount(prev => prev + vote)
        }
        setVoteValue(vote)
        handleCommentVote(vote)
      }
    },
    [handleCommentVote, user, voteValue]
  )

  const handleReply = useCallback(() => {
    if (replying && reply !== '' && handleNewComment) {
      handleNewComment(comment.id, reply)
      setReply('')
    }
    setReplying(!replying)
  }, [comment.id, handleNewComment, reply, replying])

  const [showEditMenu, setShowEditMenu] = React.useState(false)
  const ownComment = useMemo(() => comment.userId === user?.id, [comment, user])

  const [editing, setEditing] = React.useState(false)
  const [editedMessage, setEditedMessage] = React.useState(comment.text)

  return (
    <article
      className={`ml-4 relative p-6 mb-3 text-base bg-white rounded-lg dark:bg-gray-900 ${
        !root ? 'ml-10 lg:ml-12' : ''
      } ${newSection ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
    >
      <div className="flex flex-col items-center justify-center absolute top-6 -left-4 text-gray-900 dark:text-white">
        <button
          onClick={() => handleVote(1)}
          className="bg-gray-100 dark:bg-gray-700 w-6 h-6 flex justify-center rounded-t-md"
        >
          +
        </button>
        <span
          className={`${
            voteValue === -1 ? 'text-red-400' : voteValue === 1 ? 'text-green-400' : ''
          } w-6 h-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}
        >
          {voteCount}
        </span>
        <button
          onClick={() => handleVote(-1)}
          className="bg-gray-100 dark:bg-gray-700 w-6 h-6 flex justify-center rounded-b-md"
        >
          -
        </button>
      </div>
      <footer className="flex justify-between items-center mb-2 relative">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <Image className="mr-2 rounded-full" src={comment.avatar} alt="" width={24} height={24} />
            {comment.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(new Date(comment.date))}</p>
        </div>
        {ownComment && (
          <button
            onClick={() => setShowEditMenu(prev => !prev)}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
        )}
        <div
          className={`${
            !showEditMenu ? 'hidden' : ''
          } absolute top-10 right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            {handleEditComment && (
              <li>
                <a
                  onClick={() => {
                    setShowEditMenu(false)
                    setEditing(prev => !prev)
                  }}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                >
                  Edit
                </a>
              </li>
            )}
            {handleDeleteComment && (
              <li>
                <a
                  onClick={() => handleDeleteComment(comment.id)}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                >
                  Remove
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>
      {!editing ? (
        <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
      ) : (
        handleEditComment && (
          <div className="mt-2">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <textarea
                id="comment"
                rows={3}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                value={editedMessage}
                onChange={e => setEditedMessage(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setEditing(false)
                handleEditComment(comment.id, editedMessage)
              }}
              className="mr-3 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Edit comment
            </button>
            <button
              onClick={() => {
                setEditing(false)
                setEditedMessage(comment.text)
              }}
              type="button"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Cancel
            </button>
          </div>
        )
      )}
      {!replying && user && (
        <div className={`${root ? 'flex' : 'hidden'} items-center mt-4 space-x-4`}>
          <button
            onClick={() => setReplying(true)}
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
        </div>
      )}
      {replying && handleNewComment && (
        <div className="mt-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea
              id="comment"
              rows={3}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
              value={reply}
              onChange={e => setReply(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleReply()}
            className="mr-3 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Reply to comment
          </button>
          <button
            onClick={() => setReplying(false)}
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  )
}
