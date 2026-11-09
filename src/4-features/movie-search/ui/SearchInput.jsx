import { Link } from "react-router"
import useSearch from "../model/useSearch"
import searchImg from '../../../6-shared/assets/icons/search.svg'
import styles from'./SearchInput.module.scss'

const SearchInput = () => {

  const { search, setSearch, filterMovies } = useSearch()

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search" className="visually-hidden">Search</label>
      <input
        type="search"
        className={styles.input}
        id="search"
        title="Search"
        aria-label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length > 0 && (
        <ul className={styles.listMovies}>
          {filterMovies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movie/${movie.id}`}
                className={styles.itemMovies}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <img 
        src={searchImg} 
        alt="Search"
        className={styles.searchIcon} />
    </div>
  )
}

export default SearchInput