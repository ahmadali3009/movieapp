import { Link } from 'react-router-dom';

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
      <div className="movie-card">
        <div className="movie-rating-badge">{movie.vote_average?.toFixed(1)}</div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${title} poster`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="movie-card-overlay">
          <button className="view-details-btn">View Details</button>
        </div>
        <h1>{title}</h1>
      </div>
    </Link>
  );
};

export default MovieCard;
