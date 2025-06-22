import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE;
const API_KEY = import.meta.env.VITE_API_KEY;

export const searchMovies = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return data;
};