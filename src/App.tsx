import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Toprated from './Toprated'
import HeroBanner from './components/HeroBanner'
import MovieCard from './components/MovieCard'

export interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  vote_average: number;
  release_date: string;
  popularity: number;
  overview: string;
  backdrop_path: string;
}
function App() {
  let [page , setpage] = useState(1)
  let [search , setsearch] = useState("")
  let [searchTerm , setsearchTerm] = useState("")
  let searchFetch = async()=>
    {
      let searchdata = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2548a82cdbcc3c2703fceec99fee278e&query=${searchTerm}`)
      console.log("searchdata",searchdata)
      return searchdata
    }
  let searchbuttton =  ()=>
    {
      setsearchTerm(search)
      // refetch();

    }


  let handlesearch = (e:any)=>
    {
      let value =  e.target.value
      console.log("value",value)
      setsearch(value)

    }
  let handlepage = ()=>
    {
      let nextpage = data?.data.page + 1
      setpage(nextpage)
      console.log(nextpage)
    }
    let handlepreviouspage = ()=>
      {
        let nextpage = data?.data.page - 1
        setpage(nextpage)
        console.log(nextpage)
      }
  let returndata = async ()=>
    {
      let data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2548a82cdbcc3c2703fceec99fee278e&page=${page}`)
      return data
    }

    const { data:data, error:dataerror, isLoading:dataisloading } = useQuery({
      queryKey: ['movies' , page],
      queryFn: returndata,
    });
    const { data: searchData, error: searchError, isLoading: searchIsLoading , refetch } = useQuery({
      queryKey: ['search', searchTerm], // Use searchTerm as key
      queryFn: searchFetch,
      enabled: !!searchTerm, // Disable automatic fetching
    });
    useEffect(() => {
      if (searchTerm) {
        refetch(); // Call refetch only when searchTerm is updated
      }
    }, [searchTerm, refetch]); // Dependency array ensures refetch runs only when searchTerm changes


    if (dataisloading) {
      return (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading movies...</p>
          <div className="skeleton-container">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-loader"></div>
            ))}
          </div>
        </div>
      );
    }

    if (dataerror) {
      return <div className="loading">Error loading movies: {dataerror.message}</div>;
    }

    if (searchIsLoading) {
      return (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading search results...</p>
        </div>
      );
    }

    if (searchError) {
      return <div className="loading">Error loading search results: {searchError.message}</div>;
    }


  // Get featured movies from the data if available
  const featuredMovies = data?.data.results ? data.data.results.slice(0, 5) : [];

  return (
    <div className="app-container">
      {/* Hero Banner */}
      <HeroBanner movies={featuredMovies} interval={5000} />

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          onChange={handlesearch}
          value={search}
        />
        <button onClick={searchbuttton}>
          Search
        </button>
      </div>

      {/* Search Results Section */}
      {searchData?.data.results && searchData.data.results.length > 0 && (
        <section>
          <h2 className="results-title">Search Results</h2>
          <div className="movie-scroll">
            {searchData.data.results.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                linkPath={`/${movie.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Movie List Section */}
      <section>
        <h2 className="results-title">Popular Movies</h2>
        <div className="movie-scroll">
          {data && data.data.results.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              linkPath={`/${movie.id}`}
            />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="pagination">
          <h2>Page: {page}</h2>
          <div>
            <button
              onClick={handlepreviouspage}
              disabled={page <= 1}
            >
              Previous
            </button>
            <button
              onClick={handlepage}
              style={{ marginLeft: '1rem' }}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <Toprated />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>MovieApp is your ultimate destination for discovering movies and TV shows. Explore our vast collection of titles and stay updated with the latest releases.</p>
            <div className="social-icons">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">IG</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Movies</a></li>
              <li><a href="#">TV Shows</a></li>
              <li><a href="#">Top Rated</a></li>
              <li><a href="#">Coming Soon</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@movieapp.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: xyz Movie Street, Hollywood, CA</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        className="floating-action-button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

export default App
