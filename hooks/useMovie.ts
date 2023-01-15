import { MovieDetails } from '@app/(site)/movies/[movieId]/MovieDetails'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useMovie(url: string | null) {
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    movie: data,
    isLoading,
    error,
  } as { movie: MovieDetails; isLoading: boolean; error: Error }
}
