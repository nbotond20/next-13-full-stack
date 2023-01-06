import React from 'react'

const Page = async ({ params }: { params: { movieId: string } }) => {
  return <p>{params.movieId}</p>
}

export default Page
