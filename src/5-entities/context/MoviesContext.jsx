import { createContext, useState, useEffect, useRef } from "react"
import { getPopularMovies } from "../../6-shared/api/tmdb";

export const MoviesContext = createContext({})

export const MoviesProvider = (props) => {

  const { children }= props
  
  const [movies, setMovies] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [hasError, setHasError] = useState(false)
  
  const [activeMovie, setActiveMovie] = useState(0)

  const [isExpanded, setIsExpanded] = useState(false)

  const [isClamped, setIsClamped] = useState(false)

  const overviewRef = useRef(null)

  useEffect(() => {

    const timer = setTimeout(() => {
      if (overviewRef.current) {
        if (overviewRef.current.scrollHeight > overviewRef.current.clientHeight) {
          setIsClamped(true)
        } else {
          setIsClamped(false)
        }
      }
    }, 1)

    return () => clearTimeout(timer)
    
  }, [activeMovie, movies])

  useEffect(() => {
    setIsExpanded(false)
  }, [activeMovie]) 

  useEffect(() => {
    
    const getData = async () => {

      try {
        const data = await getPopularMovies()
        setMovies(data)
      } catch(error) {
        setHasError(true)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }


    getData()

  }, [])

  return (
    <MoviesContext.Provider 
      value={{
        movies,
        isLoading,
        hasError,
        activeMovie,
        setActiveMovie,
        isExpanded,
        setIsExpanded,
        isClamped,
        overviewRef
      }}>
      {children}
    </MoviesContext.Provider>
  )
}
