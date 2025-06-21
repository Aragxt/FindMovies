// src/hooks/usePopularMovies.js
import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../api/movies';

export const usePopularMovies = () => {
  return useQuery(['popular-movies'], getPopularMovies);
};
