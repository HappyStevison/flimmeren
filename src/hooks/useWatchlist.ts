import { useEffect, useState } from "react";
import type { Movie } from '../types/movie';
export function useWatchlist() {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    useEffect(()=> {
        const raw = localStorage.getItem('flimmeren-watchlist');
        if(raw) setWatchlist(JSON.parse(raw));
    },[]);

    useEffect(()=> {
        localStorage.setItem("flimmeren-watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addMovie = (m: Movie) =>
        setWatchlist(prev => {
            if(prev.some(x => x.id === m.id)) return prev;
            return [...prev, m];
        });

    const isInWatchlist = (id: number) => watchlist.some(m => m.id === id);

    return { watchlist, addMovie, isInWatchlist};
}