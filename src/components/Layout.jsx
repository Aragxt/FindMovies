// src/components/Layout.jsx
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Encabezado */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 w-full px-4">
        {children}
      </main>

      {/* Footer opcional */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 FindMovies. Todos los derechos reservados.
      </footer>
    </div>
  );
}
