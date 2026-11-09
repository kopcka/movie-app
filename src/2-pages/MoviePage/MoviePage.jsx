import { useContext } from 'react'
import { useParams, Link } from 'react-router'
import { MoviesContext } from '../../5-entities/context/MoviesContext'
import WatchTrailer from '../../4-features/watch-trailer'
import styles from './MoviePage.module.scss'

const MoviePage = () => {
  const {
    movies,
    isLoading,
    hasError,
  } = useContext(MoviesContext)

  const { id } = useParams()

  const findMovie = movies.find((movie) => {
    return movie.id === Number(id)
  })

  const imageUrl = 'https://image.tmdb.org/t/p/original'

  return (
    <div className={styles.MovieImage} style={{ backgroundImage: findMovie?.backdrop_path ? `url(${imageUrl}${findMovie.backdrop_path})` : 'none'  }}>
      <Link
        to={'/'}
        className={styles.MoviePageBack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </Link>

      <section className={`${styles.aboutMovie} container`}>
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {hasError && <p className={styles.Error}>Ошибка ответа сервера</p>}
        {!isLoading && !hasError && !findMovie && <p>Фильм не найден</p>}
        {findMovie && (
          <>
            <h2 className={styles.aboutMovieTitle}>{findMovie.title}</h2>
            <div className={styles.aboutMovieInfoMovie}>
              <p className={styles.aboutMovieAverage}>{findMovie.vote_average}</p>
              <p className={styles.aboutMovieCount}>({findMovie.vote_count})</p>
              <p className={styles.aboutMovieRelease}>{findMovie.release_date}</p>
            </div>
            <p className={styles.aboutMovieOverview}>
              {findMovie.overview}
            </p>
            <div className={styles.aboutMovieButtons}>
              <WatchTrailer
                movieId={findMovie.id}
                className={`${styles.aboutMovieButtonTrail} ${styles.button}`}
              />
              <button 
                type="button" 
                className={`${styles.aboutMovieButtonFilm} ${styles.button}`}
                onClick={() => alert('soon')}
              >
                Watch now
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
export default MoviePage