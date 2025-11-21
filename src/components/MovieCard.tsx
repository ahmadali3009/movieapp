import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: {
    id: number;
    poster_path: string;
    title?: string;
    original_title?: string;
    name?: string;
    vote_average: number;
  };
  linkPath: string;
  state?: any;
}

const MovieCard = ({ movie, linkPath, state }: MovieCardProps) => {
  // Determine which title to use (movies have title/original_title, TV shows have name)
  const title = movie.title || movie.original_title || movie.name || 'Unknown Title';

  return (
    <Link to={linkPath} state={state}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative bg-slate-800 rounded-xl overflow-hidden shadow-lg group h-full border border-slate-700/50"
      >
        <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{movie.vote_average?.toFixed(1)}</span>
        </div>

        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
            alt={`${title} poster`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;
