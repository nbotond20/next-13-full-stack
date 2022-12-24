import React from 'react'

const User = ({ user }) => {
  return (
    <section>
      <div>
        <div>
          <span>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    </section>
  )
}

export default User
