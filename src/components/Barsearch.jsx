import { useState } from 'react';
import { useSearchMovies } from '../hooks/useSearchMovies';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useSearchMovies(query);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p>Buscando...</p>}
      {error && <p>Error al buscar: {error.message}</p>}

      <ul>
        {data?.results?.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}