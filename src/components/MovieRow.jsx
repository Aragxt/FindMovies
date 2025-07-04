import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MovieRow({ title, fetchUrl }) {
  const scrollRef = useRef(null);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${fetchUrl}&page=${pageParam}`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', fetchUrl],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  // Detect when scroll reaches end to fetch more
  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 100 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-red-400 text-xl font-bold mb-2">{title}</h2>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto space-x-4 px-2 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent"
      >
        {data?.pages.map((page) =>
          page.results.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="min-w-[150px] block hover:scale-105 transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full"
              />
              <p className="text-white mt-1 text-sm truncate">{movie.title}</p>
              <p className="text-gray-400 text-xs">{movie.vote_average}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
