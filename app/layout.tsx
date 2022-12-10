import './globals.css'
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <h1>New H1</h1>
      <body>{children}</body>
    </html>
  )
}
