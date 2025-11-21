import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Star, Eye, Play } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  popularity: number;
}

interface HeroBannerProps {
  movies: Movie[];
  interval?: number; // Time in milliseconds between rotations
}

const HeroBanner = ({ movies, interval = 5000 }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, interval);

    return () => clearInterval(timer);
  }, [movies, interval]);

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];
  if (!movie || !movie.backdrop_path) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl shadow-2xl my-8 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/30 to-transparent z-10" />
          <img
            className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-[10s] ease-out"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 lg:p-16 flex flex-col items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight drop-shadow-lg">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base text-slate-300">
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{movie.release_date?.split('-')[0]}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <Eye className="w-4 h-4 text-pink-400" />
                <span>{Math.round(movie.popularity)} views</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-slate-200 mb-8 line-clamp-3 md:line-clamp-none max-w-2xl drop-shadow-md">
              {movie.overview}
            </p>

            <div className="flex items-center gap-4">
              <Link to={`/${movie.id}`}>
                <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </button>
              </Link>
              <button className="px-8 py-3 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Add to List
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-2 z-30">
          {movies.slice(0, Math.min(5, movies.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-white w-6 md:w-8'
                  : 'bg-white/30 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
