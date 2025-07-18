import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; //Importing QueryClient 

const queryClient = new QueryClient(); //Creating a new instance of QueryClient


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);