import { useContext } from 'react'
import { Link } from 'react-router'
import { MoviesContext } from '../../5-entities/context/MoviesContext'
import styles from './MoviesCarousel.module.scss'

const MoviesCarousel = (props) => {

  const {
      movies,
      isLoading,
      hasError,
      activeMovie,
      setActiveMovie,
    } = useContext(MoviesContext)

  const imageUrlSmall = 'https://image.tmdb.org/t/p/w500'
  
  return (
    <section className={styles.mainFooter}>
      <div className={styles.mainFooterButtons}>
        {!isLoading && !hasError && <button className={styles.mainFooterButtonLeft} onClick={() => setActiveMovie(activeMovie - 1 === -1 ? movies.length - 1 : activeMovie - 1) }></button>}
        {!isLoading && !hasError && <button className={styles.mainFooterButtonRight} onClick={() => setActiveMovie(activeMovie + 1 > movies.length - 1 ? 0 : activeMovie + 1)}></button>}
      </div>

      <div className={styles.mainFooterCarousel}>
        {movies.map(({ poster_path, title, id }, index) => (
          <Link
            to={`/movie/${id}`}
            key={id}
            className={styles.mainFooterLink}
          >
            <img
              className={`${styles.mainFooterImage} ${index === activeMovie ? styles.active : ''}`}
              src={`${imageUrlSmall}${poster_path}`} 
              alt={title}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default MoviesCarousel