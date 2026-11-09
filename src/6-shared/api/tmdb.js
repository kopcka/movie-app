const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('error while loading movies')
    }

    const data = await response.json()

    return data.results

  } catch (error) {
    throw error
  }
}

export const getMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('error while loading movies')
    }

    const data = await response.json()

    const trailer = data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    )

    return trailer ? trailer.key : null

  } catch (error) {
    throw error
  }
}