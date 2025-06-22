


import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/movie';
import { useDebounce } from './useDebounce';

export const useSearchMovies = (query) => {
  const debouncedQuery = useDebounce(query, 500); // wait 500ms
  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery, // only run the query if debouncedQuery is not empty
  });
};
