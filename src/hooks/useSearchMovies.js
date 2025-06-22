


import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/movie';
import { useDebounce } from './useDebounce';

export const useSearchMovies = (query) => {
  const debouncedQuery = useDebounce(query, 500); // espera 500ms
  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery, // solo ejecuta si hay texto
  });
};
