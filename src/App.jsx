import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



import Home from './pages/Home';

export default function App() {
  return (
    <main className="w-full bg-black text-white min-h-screen">
      <Home />
    </main>
  );
}
