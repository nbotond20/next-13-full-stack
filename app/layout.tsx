import React from 'react'

import Head from 'next/head'

import MUITest from './MUITest'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <MUITest />
      </Head>
      <body>{children}</body>
    </html>
  )
}
