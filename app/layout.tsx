'use client'
import './globals.css'
import React from 'react'
import { Typography } from '@mui/material'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <Typography variant="h1">MUI H1</Typography>
      <body>{children}</body>
    </html>
  )
}
