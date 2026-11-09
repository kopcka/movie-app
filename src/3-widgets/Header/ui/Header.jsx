import { Link } from 'react-router'
import SearchInput from '../../../4-features/movie-search'
import logo from '../../../6-shared/assets/icons/logo.svg'
import styles from './Header.module.scss'

const Header = () => {
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <Link to='/' className={styles.headerLogo}>
            <img 
              src={logo} 
              alt="NEW MOVIE" 
              width={136} 
              height={30}
            />
          </Link>

          <SearchInput />
        </div>
      </div>
    </header>
  )
}

export default Header