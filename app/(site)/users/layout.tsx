import React from 'react'

export const revalidate = 0

interface UsersLayoutProps {
  children: React.ReactNode
}

const UsersLayout = async ({ children }: UsersLayoutProps) => {
  return (
    <section>
      <main>{children}</main>
    </section>
  )
}

export default UsersLayout
