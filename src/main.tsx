import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Moviedetail from './Moviedetail.tsx';
import MovieDetail2 from './moviedetal2.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",     
    element: <App />,
  },
  {
    path: "/:id",   
    element: <Moviedetail />, 
  }, {
    path: "/top-detail",  
    element: <MovieDetail2 />,
  },
  ])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  </StrictMode>,
)
