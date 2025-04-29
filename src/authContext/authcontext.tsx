import axios from 'axios';
import{ createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface User
{
  username: string;
  email: string;
  password: string;
}
interface login
{
  email: string;
  password: string;
}
interface AuthContextType{
  userlogin: login | null,
  user: User | null,
  login: (userDatalogin : login) => Promise<void>
  signup: (userDate : User) => Promise<void>
  logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [userlogin , setuserlogin] = useState<login | null>(null)
  let navigate = useNavigate()

  const signup = async (userData:User ) => {
    try {
      let response = await axios.post("http://localhost:5000/api/signup", userData)
      console.log("response", response)
      if(response.data.message === "user created")
      {
        console.log("user created")
        alert("user created")
        setUser(userData);
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  const login =async (userDatalogin: login) => {
    let response = await axios.post("http://localhost:5000/api/login", userDatalogin)
    if(response)
      {
        alert("login success")
      }
    console.log("response", response)
    localStorage.setItem("token", response.data.token)
    navigate("/" , {replace: true})
    setuserlogin(userDatalogin);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{userlogin, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};