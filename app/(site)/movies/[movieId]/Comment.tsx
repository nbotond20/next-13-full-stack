import React from 'react'

import Image from 'next/image'

interface Comment {
  id: string
  name: string
  date: string
  avatar: string
  text: string
  parentId: string | null
  voteCount: number
}

interface CommentProps {
  root?: boolean
  newSection?: boolean
  comment: Comment
}

export const Comment = ({ root, newSection, comment }: CommentProps) => {
  const [voteCount, setVoteCount] = React.useState(comment.voteCount)
  const [userVote, setUserVote] = React.useState(0)

  const handleVote = (vote: number) => {
    if (userVote === vote) {
      setUserVote(0)
    } else {
      setUserVote(vote)
    }
  }

  React.useEffect(() => {
    if (userVote === 0) {
      setVoteCount(comment.voteCount)
    } else if (userVote === 1) {
      setVoteCount(comment.voteCount + 1)
    } else if (userVote === -1) {
      setVoteCount(comment.voteCount - 1)
    }
  }, [comment, userVote])

  return (
    <article
      className={`ml-4 relative p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 ${
        !root ? 'ml-6 lg:ml-12' : ''
      } ${newSection ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
    >
      <div className="flex flex-col items-center justify-center gap-1 absolute top-6 -left-4 text-gray-900 dark:text-white">
        <button onClick={() => handleVote(1)}>+</button>
        <span className={userVote === -1 ? 'text-red-500' : userVote === 1 ? 'text-green-500' : ''}>{voteCount}</span>
        <button onClick={() => handleVote(-1)}>-</button>
      </div>
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <Image className="mr-2 rounded-full" src={comment.avatar} alt="" width={24} height={24} />
            {comment.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{comment.date}</p>
        </div>
        <button
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
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
        <div
          id="dropdownComment1"
          className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Edit
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Remove
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
      <div className={`${root ? 'flex' : 'hidden'} items-center mt-4 space-x-4`}>
        <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
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
    </article>
  )
}
