// jshint esversion:6

import React, { useEffect } from "react";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Chat from "./pages/chat/chat";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import firebase from "./util/firebase"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setAllUsers } from "./redux/actions/authActions"
import { setAllThreads } from './redux/actions/threadActions'


import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";


const App = (props) => {
  let history = useHistory();
  const { setAllThreads } = props
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        if (window.location.pathname === "/" || window.location.pathname === "/login" || window.location.path === "/signup") {
          window.location.pathname = '/chat'
        }

        let u = {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          username: user.email.split('@')[0]
        }
        props.setUser(u)
        //The correct way is simply to use history.push, but its not working.
        // history.push('/chat')
      } else {
        if (window.location.pathname !== "/" && window.location.pathname === "/login" && window.location.path === "/signup") {
          window.location.pathname = '/login'
        }
      }
    });

    let usersRef = firebase.database().ref('/users')
    usersRef.on('value', snapshot => {
      let users = []
      let val = snapshot.val();
      if (val) {
        let userIds = Object.keys(val)
        users = userIds.map(uId => val[uId])
      }
      props.setAllUsers(users)
    })

    return () => {
      unsubscribe();
      usersRef.off()
    }
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


const mapStateToProps = ({ auth }) => {
  return {
    allUsers: auth.allUsers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUser, setAllUsers, setAllThreads }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
