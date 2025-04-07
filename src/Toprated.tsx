import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Toprated = () => {
  const [page, setPage] = useState(1);
  const totalPages = 103; // Example: Setting total pages to 10 for now. Adjust according to the API data if it provides total pages.

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  let token = localStorage.getItem("token")
  console.log("token toprated", token)
  if (token) {
    try {
      // You'll need to install jwt-decode
      const decodedToken = jwtDecode(token);
      console.log("decodedToken", decodedToken)
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        // Token expired, handle accordingly
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Token expired');
      }
    } catch (error) {
      // Invalid token
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Invalid token');
    }
  }

  const FetchTopRated = async () => {
    const data = await axios.get(`localhost:5000/api/top-detail?page=${page}`);
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['toprated', page],
    queryFn: FetchTopRated,
    // keepPreviousData: true, // Keeps data of the previous page while fetching the next
  });

  if (isLoading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>Error loading movies: {error.message}</div>;
  }
  console.log(data)
  return (
    <>
      <h1>Top Rated TV Shows</h1>
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {data && data.data.results.map((movie:any) => (
            <Link to={"/top-detail"} state={{movie}}>
            <div key={movie.id} className="bg-white shadow-md rounded-lg p-4 w-48 flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.name} poster`}
                className="w-full h-60 object-cover rounded"
              />
              <h1 className="text-lg font-semibold text-center mt-2 text-black">{movie.name}</h1>
            </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handlePreviousPage} 
            disabled={page === 1} 
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
          >
            Previous
          </button>
          <span className="text-lg">
            Page {page} of {totalPages}
          </span>
          <button 
            onClick={handleNextPage} 
            disabled={page === totalPages} 
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Toprated;
