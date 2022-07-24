import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './MainPages/Home';
import { paths } from './constants/constants';
import Movies from './MainPages/Movies';
import MovieDetails from './MainPages/MovieDetails';

function App() {
  const path = paths
  return (
    <>
        <Routes>
          <Route path={path.home} element={<Home />} />
          <Route path={path.inTheater} element={<Movies path={path.inTheater} />} />
          <Route path={path.comingSoon} element={<Movies path={path.comingSoon} />} />
          <Route path={path.topratedIndian} element={<Movies path={path.topratedIndian} />} />
          <Route path={path.topratedMovies} element={<Movies path={path.topratedMovies} />} />
          <Route path={path.favourite} element={<Movies path={path.favourite} />} />
          <Route path={path.details} element={<MovieDetails/>} />
          <Route path={path.search} element={<Movies path={path.search}/>}/>
        </Routes>
    </>
  );
}

export default App;
