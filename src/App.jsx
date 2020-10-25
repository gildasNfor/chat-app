// jshint esversion:6

import React, { useEffect } from "react";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Chat from "./pages/chat/chat";
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";
import firebase from "./util/firebase"


import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";


const App = () => {
  let history = useHistory();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
      if (user) {
        console.log(user)
        if (window.location.pathname === "/" || window.location.pathname === "/login" || window.location.path === "/signup") {
          window.location.pathname = '/chat'
        }
        //The correct way is simply to use history.push, but its not working.
        //history.push('/login')
      } else {
        // No user is signed in. Continue to login or signup normally.
      }
    });
    return () => unsubscribe(); //unsubscribe when the component unmounts
  }, []);

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
