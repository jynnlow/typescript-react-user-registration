import axios from 'axios';
import React, { useState } from 'react';

import {User, ResponseStatus, Response} from './common'

const Signin: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '' , 
    password: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSignIn = async() =>{
    let response: Response
    try{
      response = await axios.post('http://localhost:8080/users/login', user)
      localStorage.setItem('token',response.data.message)
      if (response.data.status === ResponseStatus.SUCCESS){
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
