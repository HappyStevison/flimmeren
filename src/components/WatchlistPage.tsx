import { useWatchlist } from '../hooks/useWatchlist';
import MovieCard from '../components/MovieCard'; // re-use existing card

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0)
    return (
      <p className="text-white text-center mt-10">Your watch-list is empty.</p>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {watchlist.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}