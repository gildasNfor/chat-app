// jshint esversion:6

import React from "react";
import Home from "./Home";
import Login from './Login';
import Signup from './Signup';
import Success from "./success";
import Failure from "./failure";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "../styles.css";

const App = () => {

  return (<Router>
    <Switch>
      <Route path="/" exact="exact" component={Home}/>
      <Route path="/Login" exact="exact" component={Login}/>
      <Route path="/Signup" exact="exact" component={Signup}/>
      <Route path="/success" exact="exact" component={Success}/>
      <Route path="/failure" exact="exact" component={Failure}/>
    </Switch>
  </Router>);
}

export default App;
