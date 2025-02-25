import React from 'react'
import { useGetMoviesQuery } from '../../redux/api/movie.api'
import Hero from '../../components/Hero'
import Movies from '../../components/Movies'
const Home = () => {
  const {data} = useGetMoviesQuery({page:1, without_genres: "18,36,10749"})
  
  
  return (
    <div className='container mx-auto'>
      <Hero/>
      <Movies data={data} />

    </div>
  )
}

export default Home