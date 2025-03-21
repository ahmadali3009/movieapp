import { useContext, useState } from "react"
import AuthContext from "../authContext/authcontext"

const Signup = () => {
  let [input , setInput] = useState(
    {
      username: "",
      email: "",
      password: "" 
    }
  )
  console.log(input)
  let auth = useContext(AuthContext)

  return (
    <div>
      <h1>signup Page</h1>
      <input className="border p-2" type="text" placeholder='username' onChange={(e)=>setInput({...input , username:e.target.value})} value={input.username}/>  
      <input className="border p-2" type="email" value={input.email} onChange={(e)=>{setInput({...input , email:e.target.value})}} placeholder='email' />  
      <input className="border p-2" type="password" onChange={(e)=>{setInput({...input , password:e.target.value})}} value={input.password} placeholder='password' />  
      <button onClick={()=>auth.signup(input)}>signup</button>
    </div>
  )
}

export default Signup
