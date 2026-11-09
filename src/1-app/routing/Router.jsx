import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "../../2-pages/MainPage/MainPage";
import MoviePage from "../../2-pages/MoviePage/MoviePage";

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router