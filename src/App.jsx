// jshint esversion:6

import React from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Chat from "./pages/chat";
import Failure from "./pages/failure";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact="exact" component={Home} />
        <Route path="/Login" exact="exact" component={Login} />
        <Route path="/Signup" exact="exact" component={Signup} />
        <Route path="/success" exact="exact" component={Chat} />
        <Route path="/failure" exact="exact" component={Failure} />
      </Switch>
    </Router>
  );
};

export default App;
