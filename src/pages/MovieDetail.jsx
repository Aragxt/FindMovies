// src/pages/MovieDetail.jsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE;

export default function MovieDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-white">Cargando...</p>;
  if (error) return <p className="text-red-500">Error al cargar detalles.</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
        className="w-64 mb-4"
      />
      <p><strong>Fecha de estreno:</strong> {data.release_date}</p>
      <p><strong>Resumen:</strong> {data.overview}</p>
    </div>
  );
}
