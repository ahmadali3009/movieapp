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
import Signup from "./components/signup.js";
import { AuthProvider } from './authContext/authcontext.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",     
    element: <App />,
  },
  {
    path: "/:id",   
    element: <Moviedetail />, 
  }, 
  {
    path: "/top-detail",  
    element: <MovieDetail2 />,
  },
  {
    path: "/signup",  
    element: <Signup />,
  },
  ])
createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
    </AuthProvider>
)
