import React from 'react'

import Provider from '../(site)/provider'
import '../global.css'
import Header from './header'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en" className="w-full h-full">
      <head />
      <body className="w-full h-full flex justify-center items-center">
        <Header />
        <Provider>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
