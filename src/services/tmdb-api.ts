const API_KEY = "2d0f7be1ba40b0d4b2b54439738eaf59";

const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbAPI = {
  // Function to get trending movies
  getTrending: async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    return response.json();
  },
  searchMovies: async (query: string) => {
    if(!query) return;
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if(!response.ok) {
        throw new Error('Failed to search movies');
    }
    return response.json();
  },
  getMovieDetails: async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if(!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    return response.json();
  }
};