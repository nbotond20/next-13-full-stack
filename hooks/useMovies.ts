import { Movie } from '@app/(site)/movies/Movies'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useMovies(url: string | null) {
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    movies: data?.results,
    isLoading,
    error,
  } as { movies: Movie[]; isLoading: boolean; error: Error }
}
