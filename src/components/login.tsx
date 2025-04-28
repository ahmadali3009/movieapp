import { useContext, useState } from "react"
import AuthContext from "../authContext/authcontext"
import { Link } from "react-router-dom"

const Login = () => {
  let [input, setInput] = useState({
    email: "",
    password: "" 
  })

  let handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  let auth = useContext(AuthContext)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    auth?.login(input)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 p-12 flex-col justify-between">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-80">Continue your movie journey with us.</p>
        </div>
        <div className="text-white/70 text-sm">
          © 2024 MovieApp. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-gray-600">Access your movie collection</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div>
                <div className="relative">
                  <input
                    id="email"
                    className="peer w-full px-4 py-3 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors"
                    type="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={handlechange}
                    name="email"
                    required
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-4 -top-5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    id="password"
                    className="peer w-full px-4 py-3 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-purple-500 transition-colors"
                    type="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={handlechange}
                    name="password"
                    required
                  />
                  <label 
                    htmlFor="password"
                    className="absolute left-4 -top-5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-5 peer-focus:text-sm peer-focus:text-purple-500"
                  >
                    Password
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-purple-500 hover:text-purple-700 font-medium">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full hover:opacity-90 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-500 hover:text-purple-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
