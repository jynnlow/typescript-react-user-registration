import React, { useState } from 'react';
import axios from 'axios';
type User = {
  username: string, 
  password: string
}

const Signin: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '' , 
    password: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSignIn = async() =>{
    try{
      const res = await axios.post('http://localhost:8080/users/login',user)
      localStorage.setItem('token',res.data.message)
      if (res.data.status === "SUCCESS"){
        window.location.href = 'http://localhost:3001/';
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container-fluid mt-5">
        <div className="container">
          <p className="h5 mb-4">Welcome! Please sign in to enter admin darshboard.</p>
          <div className="row mb-4">
            <div className="col-3">
              <label className="col-form-label">Username</label>
            </div>
            <div className="col-6">
              <input 
                type="text" 
                name="username" 
                className="form-control" 
                onChange={handleChange}
                value={user.username}>
              </input>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <label className="col-form-label">Password</label>
            </div>
            <div className="col-6">
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                onChange={handleChange}
                value={user.password}>
              </input>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <button 
              type="submit" 
              className="btn-style"
              onClick={handleSignIn}>Sign In
            </button>
          </div>
        </div>
      </div>
  )
}

export default Signin
