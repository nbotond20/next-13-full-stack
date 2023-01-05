import React from 'react'

import { Movies } from './Movies'

const getData = async (pageNumber: number) => {
  const { results, total_results, page } = await fetch(
    `${process.env.MOVIES_DB_API_URL}/trending/all/week?api_key=${process.env.MOVIES_DB_API_KEY}&page=${pageNumber}`,
    { next: { revalidate: 10 } }
  ).then(res => res.json())

  return { results, total_results, page }
}

export default async function Page() {
  const { results, total_results, page } = await getData(1)
  const elementPerPage = 20

  const imgURL = process.env.MOVIES_DB_API_IMAGE_URL!

  return (
    <section>
      <Movies
        results={results}
        totalResults={total_results}
        page={page}
        elementsPerPage={elementPerPage}
        imgURL={imgURL}
      />
    </section>
  )
}
