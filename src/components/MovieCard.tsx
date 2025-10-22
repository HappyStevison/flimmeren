import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  actionSlot?: React.ReactNode; // ➕ button (or anything else) passed from parent
}

export default function MovieCard({ movie, actionSlot }: Props) {
  return (
    <div className="relative group">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded-lg shadow-lg group-hover:scale-105 transition"
        />
      </Link>
      {actionSlot && <div className="absolute top-2 right-2">{actionSlot}</div>}
    </div>
  );
}