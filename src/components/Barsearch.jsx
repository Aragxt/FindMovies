import { useEffect, useRef, useState } from 'react';
import { useSearchMovies } from '../hooks/useSearchMovies';

export default function SearchBar() {

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data, isLoading, error } = useSearchMovies(query);

  const containerRef = useRef(null);

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
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
      />

      {isLoading && <p className="mt-4 text-red-400">Cargando...</p>}
      {error && <p>Error al buscar: {error.message}</p>}

      {query && data?.results?.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-2 bg-gray-800 rounded-lg max-h-96 overflow-y-auto shadow-lg p-4 space-y-4">
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
    </div>
  );
}