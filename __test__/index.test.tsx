import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import MUITest from '../app/MUITest'

describe('Home', () => {
  it('renders a heading', () => {
    render(<MUITest />)

    const heading = screen.getByText('MUI Test')

    expect(heading).toBeInTheDocument()
  })
})
