import React from 'react'
import { render, screen } from '@testing-library/react'
import Head from '../app/head'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Head />)

    const heading = screen.getByText('Create Next App')

    expect(heading).toBeInTheDocument()
  })
})
