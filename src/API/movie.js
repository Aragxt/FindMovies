// src/api/movies.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE;

export const getPopularMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return data.results;
};
