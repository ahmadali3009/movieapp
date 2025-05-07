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
  authStatus:{
    isloading: boolean;
    iserror: boolean;
    issuccess: boolean;
    message: string | null;
  }
  clearAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [userlogin , setuserlogin] = useState<login | null>(null)
  let [authStatus , setauthstatus] = useState({
    isloading: false,
    iserror: false,
    issuccess: false,
    message: "",
  })
  let navigate = useNavigate()
  const clearAuthStatus = () => {
    setauthstatus({
      isloading: false,
      issuccess: false,
      iserror: false,
      message: ""
    });
  };
  const signup = async (userData:User ) => {
    try {
      // Get API URL from environment variable or use localhost as fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      // Set loading state
      setauthstatus({
        isloading: true,
        iserror: false,
        issuccess: false,
        message: "Creating account...",
      });

      let response = await axios.post(`${apiUrl}/api/signup`, userData)
      console.log("response", response)

      if(response.data.message === "user created") {
        console.log("user created")
        setUser(userData);
        setauthstatus({
          isloading: false,
          iserror: false,
          issuccess: true,
          message: "Account created successfully!",
        });
        // Navigate to login page after successful signup
        navigate("/login", {replace: true});
      } else {
        setauthstatus({
          isloading: false,
          iserror: true,
          issuccess: false,
          message: "Failed to create account",
        });
      }
    }
    catch (error: any) {
      console.log(error);
      setauthstatus({
        isloading: false,
        iserror: true,
        issuccess: false,
        message: error.response?.data?.message || "Failed to create account",
      });
    }
  };
  const login =async (userDatalogin: login) => {
    // Get API URL from environment variable or use localhost as fallback
    try{
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    setauthstatus({
      isloading: true,
      iserror: false,
      issuccess: false,
      message: "logging in...",
    })
    let response = await axios.post(`${apiUrl}/api/login`, userDatalogin)
    // if(response)
    //   {
    //     alert("login success")
    //   }
    console.log("response", response)
    localStorage.setItem("token", response.data.token)
    navigate("/" , {replace: true})
    setuserlogin(userDatalogin);
    setauthstatus({
      isloading: false,
      iserror: false,
      issuccess: true,
      message: "login success",
    })
  }
  catch (error) {
    setauthstatus({
      isloading: false,
      iserror: true,
      issuccess: false,
      message: "login failed",
    })
  }
  };


  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{userlogin, user, login, logout, signup , authStatus, clearAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};