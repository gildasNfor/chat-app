// jshint esversion:6

import React from "react";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Chat from "./pages/chat/chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact="exact" component={Login} />
        <Route path="/login" exact="exact" component={Login} />
        <Route path="/signup" exact="exact" component={Signup} />
        <Route path="/chat" exact="exact" component={Chat} />
      </Switch>
    </Router>
  );
};

export default App;
