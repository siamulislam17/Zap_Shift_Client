import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router";
import router from './Route/Route';
import './index.css'
import AuthProvider from './Contexts/AuthProvider';
import 'leaflet/dist/leaflet.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient =  new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-8xl mx-auto urbanist'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
