import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { TestComponent } from '../components/Test'

describe('Home', () => {
  it('renders a heading', () => {
    render(<TestComponent />)

    const heading = screen.getByText('Test Component')

    expect(heading).toBeInTheDocument()
  })
})
