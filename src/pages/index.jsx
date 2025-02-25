import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SuspenseContainer } from '../utils'
const AllMovies = lazy(() => import("../pages/all-movies/AllMovies"))
const Saved = lazy(() => import("../pages/saved/Saved"))
const Home = lazy(() => import("../pages/home/Home"))
const Layout = lazy(() => import("../pages/layout/Layout"))
const Detail = lazy(() => import("../pages/detail/Detail"))

const RouterMain = () => {
  return (
    <div  className="dark:bg-black dark:text-white">
      <Routes>
        <Route path='/' element={<SuspenseContainer><Layout /></SuspenseContainer>}>
          <Route path='/' element={<SuspenseContainer><Home /></SuspenseContainer>} />
          <Route path='all-movies' element={<SuspenseContainer><AllMovies /></SuspenseContainer>} />
          <Route path='saved' element={<SuspenseContainer><Saved /></SuspenseContainer>} />
          <Route path='movie/:id' element={<SuspenseContainer><Detail /></SuspenseContainer>} />
        </Route>
      </Routes>
    </div>
  )
}

export default RouterMain