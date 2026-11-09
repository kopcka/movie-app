import Router from "./routing/Router"
import { MoviesProvider } from '../5-entities/context'

const App = () => {

  return (
    <MoviesProvider>
      <Router />
    </MoviesProvider>
  )

}

export default App