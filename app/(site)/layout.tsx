import React from 'react'

import '../global.css'
import Header from './header'
import Provider from './provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-screen overflow-hidden">
      <head />
      <body className="w-full h-screen overflow-hidden bg-white dark:bg-gray-900">
        <Provider>
          <Header />
          <div className="h-[calc(100vh-60px)] overflow-auto pb-14 sm:pb-0">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
