import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from './components/Navbar';
import axiosInstance from './axiosinstance/Axiosinstance';

const Moviedetail = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    let Fmoviesbyid = async () => {
        const response = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2548a82cdbcc3c2703fceec99fee278e`);
        return response.data;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['movies', id],
        queryFn: Fmoviesbyid,
        enabled: !!id,
    });

    if (isLoading) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="animate-pulse">Loading movie details...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500">
            <p>Error loading movie details: {error.message}</p>
        </div>
    );

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
                                    src={data?.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${data?.poster_path}`
                                        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'}
                                    alt={data?.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                {data?.title}
                            </h1>

                            {data?.tagline && (
                                <p className="text-xl text-slate-400 italic mb-8 font-light">
                                    "{data.tagline}"
                                </p>
                            )}

                            <div className="flex flex-wrap gap-4 mb-8">
                                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-semibold">{data?.vote_average?.toFixed(1)}</span>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                                    <Calendar className="w-4 h-4" />
                                    <span>{data?.release_date?.split('-')[0]}</span>
                                </div>

                                {data?.runtime && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                                        <Clock className="w-4 h-4" />
                                        <span>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                        Overview
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        {data?.overview}
                                    </p>
                                </div>

                                {data?.genres && data.genres.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                            <Tag className="w-5 h-5 text-pink-400" />
                                            Genres
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data.genres.map((genre: any) => (
                                                <span
                                                    key={genre.id}
                                                    className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/20 text-sm font-medium hover:bg-pink-500/20 transition-colors cursor-default"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moviedetail;
