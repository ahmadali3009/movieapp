import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Toprated from './Toprated'

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


  let handlesearch = (e)=>
    {
      let value =  e.target.value
      console.log("value",value)
      setsearch(value)

    }
  let handlepage = (e)=>
    {
      let nextpage = data?.data.page + 1
      setpage(nextpage)
      console.log(nextpage)
    }
    let handlepreviouspage = (e)=>
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
      return <div>Loading movies...</div>;
    }
    
    if (dataerror) {
      return <div>Error loading movies: {dataerror.message}</div>;
    }
    
    if (searchIsLoading) {
      return <div>Loading search results...</div>;
    }
    
    if (searchError) {
      return <div>Error loading search results: {searchError.message}</div>;
    }
    
  
  return (
    <>
     <input
        type="text"
        placeholder="Search for movies..."
        onChange={handlesearch}
        value={search} // Bind the input to the search state

        className="w-80 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
      onClick={searchbuttton} 
        className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>
      
      <div className="p-4 max-w-5xl mx-auto">
  <h1 className="text-2xl font-bold mb-4 text-center">Search Results</h1>
  <div className="flex space-x-4 overflow-x-auto scrollbar-hide"> {/* Flex container for horizontal layout */}
   
    {searchData?.data.results.map(movie => (
       <Link to={`/${movie.id}`}>
      <div key={movie.id} className="bg-white shadow-md rounded-lg p-4 w-48 flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.original_title} poster`}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-lg font-semibold text-center mt-2 text-black">{movie.original_title}</h1>
      </div>
      </Link>

    ))}
  </div>
</div>




  <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Movie List (Page {page})</h1>
      {/* Horizontal scrollable movie list */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {data && data.data.results.map(movie => (
          <Link to={`/${movie.id}`}>
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-4 w-48 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="w-full h-60 object-cover rounded"
            />
            <h1 className="text-lg font-semibold text-center mt-2 text-black">{movie.title}</h1>
          </div>
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-lg font-medium">Page: {page}</h2>
        <button
          onClick={handlepreviouspage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Previous
        </button>
        <button
          onClick={handlepage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>

    <Toprated></Toprated>

    </>
  )
}

export default App
