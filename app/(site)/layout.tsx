import React from 'react'

import '../global.css'
import Header from './header'
import Provider from './provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-screen overflow-hidden">
      <head />
      <body className="w-full h-screen overflow-hidden bg-white dark:bg-gray-700">
        <Provider>
          <Header />
          <div className="h-[calc(100vh-60px)] overflow-auto">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
