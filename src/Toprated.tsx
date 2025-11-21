import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import MovieCard from './components/MovieCard';
import axiosInstance from './axiosinstance/Axiosinstance';

const Toprated = () => {
  const [page, setPage] = useState(1);
  const totalPages = 103; // Example: Setting total pages to 10 for now. Adjust according to the API data if it provides total pages.

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      document.getElementById('top-rated-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      document.getElementById('top-rated-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  let token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode<{ exp?: number }>(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.warn("Token expired, will attempt refresh via Axios interceptor");
      }
    } catch (error) {
      console.error("Invalid token format", error);
      localStorage.removeItem("token");
    }
  }

  const FetchTopRated = async () => {
    const data = await axiosInstance.get(`/api/top-detail?page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return data;
  };

  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ['toprated', page],
    queryFn: FetchTopRated,
  });

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-slate-400">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="animate-pulse">Loading top rated masterpieces...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/20 mx-4">
        <p>Error loading top rated movies: {error.message}</p>
      </div>
    );
  }

  return (
    <section id="top-rated-section" className="space-y-8 py-8">
      <div className="flex items-center gap-3 mb-8 px-4">
        <div className="p-2 bg-yellow-500/10 rounded-lg">
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Top Rated TV Shows
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4"
      >
        {data && data.data.results.map((movie: any, index: number) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MovieCard
              movie={movie}
              linkPath={"/top-detail"}
              state={{ movie }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 px-4">
        <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-sm p-2 rounded-xl border border-slate-800 shadow-xl">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white group"
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <span className="px-4 font-medium text-slate-300 min-w-[100px] text-center">
            Page <span className="text-yellow-500 font-bold">{page}</span> of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white group"
            title="Next Page"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Toprated;
