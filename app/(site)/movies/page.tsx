import React from 'react'

import { Movies } from './Movies'

export default async function Page() {
  return (
    <section>
      {/* @ts-expect-error Server Component */}
      <Movies />
    </section>
  )
}
