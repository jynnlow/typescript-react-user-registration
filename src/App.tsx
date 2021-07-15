import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import jwt_decode, { JwtPayload } from 'jwt-decode'

import Signin from './Components/Signin';
import Nav from './Components/Nav';
import Signup from './Components/Signup';
import GetUsersPage from './Components/GetUsersPage';

import './App.css';

function App() {
  //get token
  const token = localStorage.getItem('token');
  //if token is not available
  if (!token){
    return (
      <div className="App">
        <Signin />
      </div>
    )
  }else{
    //check if the token is expired
    const { exp } = jwt_decode<JwtPayload>(token);
    if( exp && exp < Date.now() / 1000){
      //remove the token if expired and return sign in page
      localStorage.removeItem('token')
      return (
        <div className="App">
          <Signin />
        </div>
      )
    }else{
      return (
        <Router>
          <div className="App">
            <Switch>
              <Route path="/welcome" exact component={Signin}/>
              <React.Fragment>
                <Nav />
                <Route path="/" exact component={Signup}/>
                <Route path="/get-users" component={GetUsersPage}></Route>
              </React.Fragment>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
