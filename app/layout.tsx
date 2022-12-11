'use client'

import React from 'react'

import { Typography } from '@mui/material'
import Head from 'next/head'

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <Typography variant="h1">MUI H1</Typography>
      </Head>
      <body>{children}</body>
    </html>
  )
}
