import React from 'react'

import '../global.css'
import Header from './header'
import Provider from './provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <Header />
          <main style={{ marginTop: '73px' }}>{children}</main>
        </Provider>
      </body>
    </html>
  )
}
