import { useLocation } from 'react-router-dom';

const MovieDetail2 = () => {
  const location = useLocation();
  const movie = location.state?.movie;  // Retrieve movie data from location state

  if (!movie) {
    return <div>No movie data available</div>;
  }

  return (
    <div>
      <h1>{movie.name}</h1>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.name} poster`} />
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetail2;
