import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signin from './Components/Signin';
import Nav from './Components/Nav';
import Signup from './Components/Signup';
import GetUsersPage from './Components/GetUsersPage';

function App() {
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

export default App;
