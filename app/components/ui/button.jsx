'use client'

import React, { forwardRef } from 'react'

import Link from 'next/link'

const Button = forwardRef(function Button({ href, ...props }, ref) {
  return href ? <Link ref={ref} href={href} {...props} /> : <button ref={ref} {...props} />
})

export default Button
