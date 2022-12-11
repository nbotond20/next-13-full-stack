import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Head from '../app/head'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Head />)

    const heading = screen.getByText('Create Next App')

    expect(heading).toBeInTheDocument()
  })
})
