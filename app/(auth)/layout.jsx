import React from 'react'

import Link from 'next/link'

import Provider from '../(site)/provider'

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <main>
            <div>
              <Link href="/">
                <span>Home</span>
              </Link>
              <div>
                <h1>Sign in to your account</h1>
              </div>
              <div>{children}</div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  )
}
