import React from 'react'

import '../global.css'
import Header from './header'
import Provider from './provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-full">
      <head />
      <body className="w-full h-full pt-[73px]">
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
