import React, {useEffect,useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { updateSearchCount } from './appwrite.js'
import { getTrendingMovies } from './appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  console.log(API_KEY)
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setmovieList] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('')
  const [trendingMovies, settrendingMovies] = useState([])
  useDebounce(() => {
    setdebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm])
  const fetchMovies = async (query) => {
    setisLoading(true)
    setErrorMessage('')

    try {
      const endpoint =query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}` : 
      `${API_BASE_URL}/movie/popular?api_key=${API_KEY}`
      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
        throw new Error(`Failed to fetch movies`)
      }
      const data = await response.json()
      if (data.response==='False'){
        setErrorMessage(data.Error) ||`Failed to fetch movies. Please try again later.`;
        setmovieList([]);
      } 
      setmovieList(data.results||[])
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Failed to fetch movies. Please try again later.')
    }
    finally {
      setisLoading(false)
    }
  }
  const loadTrendingMovies = async () => {
    try {
      const trending = await getTrendingMovies();
      settrendingMovies(trending);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])
  useEffect(() => {
    loadTrendingMovies();
  }, [])
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>movies</span> you'll love  without the hassle.</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='trending'>
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            ))}
          </ul>
        </section>
        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App