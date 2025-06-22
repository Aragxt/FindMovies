


import SearchBar from '../components/Barsearch';
import MovieRow from '../components/MovieRow';


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE;

const requests = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
};


export default function Home() {
  return (
    <section className = "px-4">
      <SearchBar />

      <MovieRow title="Trending Now" fetchUrl={requests.trending} />
      <MovieRow title="Top Rated" fetchUrl={requests.topRated} />
      <MovieRow title="Upcoming" fetchUrl={requests.upcoming} />
      <MovieRow title="Now Playing" fetchUrl={requests.nowPlaying} />
    </section>
  );
}
