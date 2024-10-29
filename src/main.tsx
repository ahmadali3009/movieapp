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
import Toprated from './Toprated.tsx';
import MovieDetail2 from './moviedetal2.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",      // Main route for App component
    element: <App />,
  },
  {
    path: "/:id",   // Route for movie details page
    element: <Moviedetail />, // Use a dedicated details component here if available
  }, {
    path: "/top-detail",   // Route for movie details page
    element: <MovieDetail2 />, // Use a dedicated details component here if available
  },
  ])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  </StrictMode>,
)
