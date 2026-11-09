import { useContext } from "react";
import Header from "../../3-widgets/Header/ui";
import MoviesCarousel from "../../4-features/movies-carousel";
import styles from './MainPage.module.scss'
import { MoviesContext } from "../../5-entities/context/MoviesContext";
import WatchTrailer from "../../4-features/watch-trailer";

const MainPage = () => {
  const {
    movies,
    isLoading,
    hasError,
    activeMovie,
    isExpanded,
    setIsExpanded,
    isClamped,
    overviewRef
  } = useContext(MoviesContext)

  const imageUrl = 'https://image.tmdb.org/t/p/original'

  const imageUrlSmall = 'https://image.tmdb.org/t/p/w500'

  const heroImage = movies.length > 0 
    ? { backgroundImage: `url(${imageUrl}${movies[activeMovie]?.backdrop_path})`}
    : undefined

  const errorView = hasError
    ? <p className={styles.Error}>Ошибка ответа сервера</p>
    : null

  return (
    <div className={styles.heroWrapper} style={heroImage}>

      <div className="margin-inline">
        
        <Header />
        <main className="container">
        
          <div className={styles.mainBody}>
            <section className={styles.mainHeader}>
              {!isLoading && !hasError && movies.length > 0 && (
                <div className={styles.mainHeaderBody}>
                  <h2 className={styles.mainHeaderTitle}>{movies[activeMovie].title}</h2>
                  <div className={styles.mainHeaderInfoMovie}>
                    <p className={styles.mainHeaderAverage}>{movies[activeMovie].vote_average}</p>
                    <p className={styles.mainHeaderCount}>({movies[activeMovie].vote_count})</p>
                    <p className={styles.mainHeaderRelease}>{movies[activeMovie].release_date}</p>
                  </div>
                  <div className={styles.mainHeaderOverviewWrap}>
                    <p ref={overviewRef} className={`${styles.mainHeaderOverview} ${isExpanded ? styles.mainHeaderOverviewExpanded : ''}`}>
                      {!isLoading && !hasError && isClamped && !isExpanded && <button type="button" className={styles.mainHeaderOverviewBtn} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '' : 'See more'}</button>}
                      {movies[activeMovie].overview}
                      {isExpanded &&(
                        <button type="button" className={styles.mainHeaderOverviewLess} onClick={() => setIsExpanded(false)}>
                          See less
                        </button>
                      )}
                    </p>
                  </div>

                  <div className={styles.mainHeaderButtons}>
                    {!isLoading && !hasError && 
                      <WatchTrailer
                        movieId={movies[activeMovie].id}
                        className={`${styles.mainHeaderButtonTrail} ${styles.button}`}
                      />}
            
                    {!isLoading && !hasError && 
                      <button 
                        type="button" 
                        className={`${styles.mainHeaderButtonFilm} ${styles.button}`}
                        onClick={() => alert('soon')}
                      >
                        Watch now
                      </button>}
                  </div>
                </div>
              )}
            </section>

            <MoviesCarousel />

          </div>
        </main>
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {errorView}
      </div>

    </div>
  )
}

export default MainPage