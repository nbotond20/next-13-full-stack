import React from 'react'

import Footer from './footer'
import Header from './header'
import Provider from './provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, paddingTop: '7vh', paddingBottom: '7vh', width: '100vw', height: '86vh' }}>
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
