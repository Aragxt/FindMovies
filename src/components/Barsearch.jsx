import { useEffect, useRef, useState } from 'react';
import { useSearchMovies } from '../hooks/useSearchMovies';


export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data, isLoading, error } = useSearchMovies(query);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  return (
    
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto mt-10">

      <input
        ref={inputRef}
        type="text"
        placeholder="Search your movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
      />

      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            inputRef.current?.focus(); //Focus back on input after clearing
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-red-500 font-bold focus:outline-none bg-transparent"
        >
          X
        </button>
      )}

      {isFocused && query.trim() !== '' && (
      <>
        {isLoading && <p className="mt-4 text-red-400">Cargando...</p>}
        {error && <p>Error: {error.message}</p>}

        {data?.results?.length > 0 && (
          <ul className="absolute z-10 mt-2 bg-gray-800 rounded-lg p-4 space-y-4 max-h-80 overflow-y-auto w-full shadow-lg scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
            {data.results.map((movie) => (
              <li key={movie.id} className="flex items-start space-x-4">
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-24 rounded"
                />
                <div>
                  <h3 className="text-red-400 font-bold">{movie.title}</h3>
                  <p className="text-white text-sm">
                    {movie.release_date?.slice(0, 4)}<br />
                    {movie.overview?.slice(0, 80)}...
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    )}
    </div>
  );
}