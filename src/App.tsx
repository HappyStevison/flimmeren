// In src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrendingMovies from './components/TrendingMovies';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import MovieDetailPage from './components/MovieDetailPage'; // Temporarily comment this out
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const handleSearch = (query: string) => {
    setSearchQuery(query.trim() ? query : null);
  };

  return (
    <Router>
      <div className="bg-slate-800 min-h-screen">
        <header className="bg-slate-900 p-4">
          <h1 className="text-3xl font-bold text-white text-center">Movie Dashboard</h1>
          <SearchBar onSearch={handleSearch} />
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<TrendingMovies searchQuery={searchQuery} />} />
            {/* Temporarily comment out the route that might be causing the problem */}
            <Route path="/movies/:movieId" element={<MovieDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;