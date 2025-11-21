import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, Sparkles, ArrowUp } from 'lucide-react'

import Toprated from './Toprated'
import HeroBanner from './components/HeroBanner'
import MovieCard from './components/MovieCard'
import Navbar from './components/Navbar'
import { LLMsContext } from './LLMsContext/LLmscontext.tsx';
import axiosInstance from './axiosinstance/Axiosinstance.ts'

export interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  vote_average: number;
  release_date: string;
  popularity: number;
  overview: string;
  backdrop_path: string;
}

function App() {
  let [page, setpage] = useState(1)
  let [search, setsearch] = useState("")
  let [searchTerm, setsearchTerm] = useState("")
  let [showScrollTop, setShowScrollTop] = useState(false)
  let llms = useContext(LLMsContext)

  let searchFetch = async () => {
    let searchdata = await axiosInstance.get(`https://api.themoviedb.org/3/search/movie?api_key=2548a82cdbcc3c2703fceec99fee278e&query=${searchTerm}`)
    console.log("searchdata", searchdata)
    return searchdata
  }
  let searchbuttton = () => {
    setsearchTerm(search)
    llms?.LLMssugetion(search)
  }

  let handlepage = () => {
    let nextpage = data?.data.page + 1
    setpage(nextpage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  let handlepreviouspage = () => {
    let nextpage = data?.data.page - 1
    setpage(nextpage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  let returndata = async () => {
    let data = await axiosInstance.get(`https://api.themoviedb.org/3/discover/movie?api_key=2548a82cdbcc3c2703fceec99fee278e&page=${page}`)
    return data
  }

  const { data: data, error: dataerror, isLoading: dataisloading } = useQuery({
    queryKey: ['movies', page],
    queryFn: returndata,
  });
  const { data: searchData, error: searchError, isLoading: searchIsLoading, refetch } = useQuery({
    queryKey: ['search', searchTerm], // Use searchTerm as key
    queryFn: searchFetch,
    enabled: !!searchTerm, // Disable automatic fetching
  });

  useEffect(() => {
    if (searchTerm) {
      console.log("suggestioon form llms", llms?.responsesuggestion)
      refetch(); // Call refetch only when searchTerm is updated
    }
  }, [searchTerm, refetch]); // Dependency array ensures refetch runs only when searchTerm changes

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (dataisloading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium animate-pulse">Loading movies...</p>
      </div>
    );
  }

  if (dataerror) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500">Error loading movies: {dataerror.message}</div>;
  }

  if (searchIsLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium animate-pulse">Searching the universe...</p>
      </div>
    );
  }

  if (searchError) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500">Error loading search results: {searchError.message}</div>;
  }

  // Get featured movies from the data if available
  const featuredMovies = data?.data.results ? data.data.results.slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <Navbar />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Hero Banner */}
        <section>
          <HeroBanner movies={featuredMovies} interval={5000} />
        </section>

        {/* Search Section */}
        <section className="relative z-20 -mt-8 md:-mt-16 mx-auto max-w-3xl">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for movies or ask AI for recommendations..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 pl-12 pr-4 py-3 rounded-xl focus:bg-slate-800/50 transition-colors"
                onChange={(e) => setsearch(e.target.value)}
                value={search}
                onKeyPress={(e) => e.key === 'Enter' && searchbuttton()}
              />
            </div>
            <button
              onClick={searchbuttton}
              className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 whitespace-nowrap"
            >
              Search
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Try: <span className="text-indigo-400">"action movies with plot twists"</span> or <span className="text-pink-400">"feel-good comedies from the 90s"</span>
          </p>
        </section>

        {/* LLM Suggestions Section */}
        <AnimatePresence>
          {llms?.isLoading && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  AI Powered Recommendations
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-xl h-[400px] animate-pulse border border-slate-800"></div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {llms?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
            <p>Error getting AI suggestions: {llms.error}</p>
          </div>
        )}

        {llms?.responsesuggestion && llms.responsesuggestion.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                AI Recommendations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {llms.responsesuggestion.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden hover:border-indigo-500/30 transition-colors group flex flex-col h-full"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    {suggestion.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
                        alt={`${suggestion.title} poster`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                        No poster available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{suggestion.title}</h3>
                    <p className="text-sm text-slate-400 mb-4 flex-grow">{suggestion.reason}</p>
                    {suggestion.id ? (
                      <Link
                        to={suggestion.is_tv ? `/tv/${suggestion.id}` : `/${suggestion.id}`}
                        className="block w-full py-2.5 bg-slate-800 hover:bg-indigo-600 text-white text-center rounded-lg font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    ) : (
                      <button
                        className="block w-full py-2.5 bg-slate-800 text-slate-500 cursor-not-allowed rounded-lg font-medium"
                        disabled
                      >
                        No Details
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search Results Section */}
        {searchData?.data.results && searchData.data.results.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white border-l-4 border-indigo-500 pl-4">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchData.data.results.map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  linkPath={`/${movie.id}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* Movie List Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white border-l-4 border-pink-500 pl-4">Popular Movies</h2>
            <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button
                onClick={handlepreviouspage}
                disabled={page <= 1}
                className="p-2 hover:bg-slate-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-3 font-medium text-slate-300">Page {page}</span>
              <button
                onClick={handlepage}
                className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-300 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data && data.data.results.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                linkPath={`/${movie.id}`}
              />
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-sm p-2 rounded-xl border border-slate-800 shadow-xl">
              <button
                onClick={handlepreviouspage}
                disabled={page <= 1}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="font-bold text-indigo-400 px-2">Page {page}</span>
              <button
                onClick={handlepage}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Top Rated Section */}
        <Toprated />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">CineVerse</span> AI
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Your intelligent movie discovery platform. Our advanced AI analyzes your preferences to recommend films and shows tailored just for you.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Movies</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">TV Shows</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Top Rated</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2 text-slate-400">
                <li>info@cineverse.ai</li>
                <li>+1 (123) 456-7890</li>
                <li>Hollywood, CA</li>
              </ul>
              <div className="flex gap-4 mt-6">
                {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} CineVerse AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:bg-indigo-500 transition-colors z-50"
            title="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
