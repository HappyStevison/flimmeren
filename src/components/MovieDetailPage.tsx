import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tmdbAPI } from "../services/tmdb-api";

interface MovieDetails {
    id: string;
    title: string;
    overview:string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    vote_average: string;
    genres: { name: string }[];
}

function MovieDetailPage() {
    // Get the movideId from the URL
    const { movieId } = useParams<{movieId:string}>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!movieId) return;
        const controller = new AbortController();

        (async () => {
            try {
                const data = await tmdbAPI.getMovieDetails(Number(movieId));
                setMovie(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        })();
        return ()=> controller.abort();
    }, [movieId]);
    if (isLoading) return <p className="text-white">Loading movie details...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if(!movie) return <p className="text-white">Movie not found.</p>


    return (
        <div className="text-white">
            <Link to="/" className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block">&larr; Back to Dashboard</Link>
            <div className="relative h-96">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <h1 className="absolute bottom-4 left-4 text-4xl font-bold">{movie.title}</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-48 rounded-lg shadow-lg"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                    <p className="text-gray-300 mb-4">{movie.overview}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map((genre) => (
                            <span key={genre.name} className="bg-indigo-600 px-3 py-1 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Rating:</strong> {Number(movie.vote_average).toFixed(1)} / 10</p>
                </div>
            </div>
        </div>
    );
}
export default MovieDetailPage;