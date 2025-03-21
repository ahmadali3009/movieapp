import axios from 'axios';
import React, { createContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const signup = async (userData: any) => {
    try {
      let response = await axios.post("http://localhost:5000/api/signup", userData)
      console.log("response", response)
      setUser(userData);
    }
    catch (error) {
      console.log(error)
    }
  };

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};