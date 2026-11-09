import { useState, useEffect } from 'react'
import { getMovieTrailer } from '../../../6-shared/api/tmdb'
import styles from './WatchTrailer.module.scss'

const WatchTrailer = ({ movieId, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleOpen = async () => {
    setIsOpen(true)
    setIsLoading(true)
    setHasError(false)
    setTrailerKey(null)

    try {
      setTrailerKey(await getMovieTrailer(movieId))
    } catch (error) {
      setHasError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => setIsOpen(false)

  // закрытие по Esc
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <>
      <button type="button" className={className} onClick={handleOpen}>
        Watch trailer
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.close}
              onClick={handleClose}
              aria-label="Close trailer"
            >
              ×
            </button>

            {isLoading && <p className={styles.message}>Loading...</p>}
            {hasError && <p className={styles.message}>Не удалось загрузить трейлер</p>}
            {!isLoading && !hasError && !trailerKey && (
              <p className={styles.message}>Трейлер не найден</p>
            )}

            {trailerKey && (
              <iframe
                className={styles.video}
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default WatchTrailer