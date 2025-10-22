import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tmdbAPI } from "../services/tmdb-api";
import type { Movie } from "../types/movie";
import { useWatchlist } from "../hooks/useWatchlist";


interface TrendingMoviesProps {
    searchQuery?: string | null;
}

function TrendingMovies({ searchQuery }: TrendingMoviesProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addMovie, isInWatchlist } = useWatchlist();


    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);

        const fetchFunction = searchQuery ? () => tmdbAPI.searchMovies(searchQuery) : tmdbAPI.getTrending;

        (async () => {
            try {
                const data = await fetchFunction();
                setMovies(data.results); // The movie list is in the `results` property
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occured');
            } finally {
                setIsLoading(false);
            }
        })();
        return () => controller.abort();

    }, [searchQuery]);
    const title = searchQuery ? `Search Results for "${searchQuery}"` : 'Trending This Week';

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            {isLoading && <p className="text-white">Loading movies...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {movies.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id}>
                        <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-50 object-cover"
                        />
                        <button
                            onClick={() => addMovie(movie)}
                            disabled={isInWatchlist(movie.id)}
                            className="absolute top-2 right-2 bg-white/80 text-black px-2 py-1 rounded-full hover:bg-white disabled:opacity-50"
                            aria-label="Add to watchlist"
                            >
                            ➕
                        </button>
                        <div className="p-2">
                            <h3 className="text-sm font-semibold text-white truncate">{movie.title}</h3>
                            <p className="text-xs text-gray-400">{movie.release_date}</p>
                        </div>
                    </div>
                    </Link>
                    
                ))}
            </div>
        </div>
    );

}

export default TrendingMovies;