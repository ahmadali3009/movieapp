import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token")
  console.log("token", token)
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes
