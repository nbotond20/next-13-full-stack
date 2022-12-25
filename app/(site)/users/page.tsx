import React from 'react'

import { Auth } from '@app/components/auth/Auth'

const Page = () => {
  return (
    <Auth>
      <section>
        <div>
          <h1>Welcome</h1>
          <div>
            <span>👈🏼</span>
            <span>select a user</span>
          </div>
        </div>
      </section>
    </Auth>
  )
}

export default Page
