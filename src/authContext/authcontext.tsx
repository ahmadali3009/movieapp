import axios from 'axios';
import{ createContext, useState } from 'react';
interface User
{
  username: string;
  email: string;
  password: string;
}
interface AuthContextType{
  user: User | null,
  login: (userData : User) => Promise<void>
  signup: (userDate : User) => Promise<void>
  logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (userData:User ) => {
    try {
      let response = await axios.post("http://localhost:5000/api/signup", userData)
      console.log("response", response)
      if(response.data.message === "user created")
      {
        console.log("user created")
        setUser(userData);
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  const login =async (userData: User) => {
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