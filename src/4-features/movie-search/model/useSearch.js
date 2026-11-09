import { useContext, useState, useMemo } from 'react'
import { MoviesContext } from '../../../5-entities/context'

const useSearch = () => {
  const {
    movies
  } = useContext(MoviesContext)

  const [search, setSearch] = useState('')

  const filterMovies = useMemo(() => {
    if (!search.trim()) return []

    return movies.filter((m) => {
      return m.title.toLowerCase().includes(search.toLowerCase().trim())
    })
  }, [search, movies])

  return {
    search,
    setSearch,
    filterMovies
  }
}
export default useSearch