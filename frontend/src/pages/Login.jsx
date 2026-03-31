import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
     e.preventDefault()
     try {
        await axios.post('http://localhost:3000/api/auth/login',
            {email,password},
            {withCredentials:true}
        )
        alert('Login successful')
     } catch (error) {
        alert('Login failed')
     }
    }

  return (
    <div>
       <h2>Login</h2>
       <form onSubmit={handleSubmit}>
           <input type="email" placeholder='Enter your email' value={email}
           onChange={(e)=>setEmail(e.target.value)} />
           <br />
           <input type="password" placeholder='Enter your password' value={password}
           onChange={(e)=>setPassword(e.target.value)} />
           <br />
           <button type='submit'>Login</button>
       </form>
    </div>
  )
}

export default Login
