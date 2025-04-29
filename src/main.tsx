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
import Login from './components/login.tsx';
import ProtectedRoutes from './authContext/ProtectedRoutes.tsx';
import About from './components/About.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider>
      <ProtectedRoutes><App /></ProtectedRoutes></AuthProvider>
    ,
  },
  {
    path: "/:id",
    element: <AuthProvider>
      <ProtectedRoutes><Moviedetail /></ProtectedRoutes></AuthProvider>
    ,
  },
  {
    path: "/top-detail",
    element: <AuthProvider>
      <ProtectedRoutes><MovieDetail2 /></ProtectedRoutes></AuthProvider>
    ,
  },
  {
    path: "/signup",
    element: <AuthProvider><Signup /></AuthProvider>
    ,
  },
  {
    path: "/login",
    element: <AuthProvider><Login /></AuthProvider>
    ,
  },
  {
    path: "/about",
    element: <AuthProvider><About /></AuthProvider>
    ,
  },
])
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
