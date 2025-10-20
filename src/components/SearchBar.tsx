import { useEffect, useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if(!query.trim()) {
            return;
        }

        const timerId = setTimeout(()=> {
            onSearch(query);
        }, 500);
        return () => {
            clearTimeout(timerId);
        }
    }, [query, onSearch])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };
    return(
        <form onSubmit={handleSubmit} className="flex justify-center p-4">
            <input
            type="text"
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </form>
    );
}

export default SearchBar;