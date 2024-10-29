import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Moviedetail = () => {
    let { id } = useParams();
    let Fmoviesbyid = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2548a82cdbcc3c2703fceec99fee278e`);
        return response.data;
    }    // Fetch movie details
    const { data, error, isLoading} = useQuery({
        queryKey: ['movies', id], // Use searchTerm as key
        queryFn: Fmoviesbyid,
        enabled: !!id, // Disable automatic fetching
      });
    console.log(data)
    if (isLoading) return <div>Loading movie details...</div>;
    if (error) return <div>Error loading movie details: {error.message}</div>;

    return (
        <div>
            {id && <h1>Movie Details for ID: {id}</h1>}
            <h2>{data?.title}</h2>
            <p>{data?.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
        </div>
    );
};

export default Moviedetail;
