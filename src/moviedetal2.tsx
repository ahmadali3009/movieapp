import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar } from 'lucide-react';
import Navbar from './components/Navbar';

const MovieDetail2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="animate-pulse">No movie data available...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Movies
        </button>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-[350px_1fr] gap-8 p-8">
            {/* Poster Section */}
            <div className="relative group">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10">
                <img
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
                  alt={`${movie.name || movie.title} poster`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                {movie.name || movie.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  <Calendar className="w-4 h-4" />
                  <span>{(movie.first_air_date || movie.release_date)?.split('-')[0]}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    Overview
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail2;
