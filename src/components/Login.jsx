// jshint esversion:6

import React, {
  useState
} from 'react';
import { Redirect, useHistory } from "react-router-dom";
import * as md5 from "md5";
import firebase from '../util/firebase';
import "../styles.css";

const Login = () => {

  const [profile, setprofile] = useState({

    username: "",
    password: ""
  });

  const history = useHistory();

  const handleChange = event => {

    const {
      name,
      value
    } = event.target;

    setprofile(profile => {
      return {
        ...profile,
        [name]: value
      };
    });
  };

  const tryLogin = event => {

    const profiles = firebase.database().ref();
    const checkProfile = {

      username: profile.username,
      password: md5(profile.password)
    };

    const {
      username,
      password
    } = checkProfile;

    profiles.on("value", snapshot => {
      const profilesArray = snapshot.val();


      for (let id in profilesArray) {

        if (profilesArray[id].username === username) {
          if (profilesArray[id].password === password) {
            console.log("Logged In");
            history.push("/success");
          }
        }else{
            history.push("/failure");
        }
      }
    });
    setprofile({
      username: "",
      password: ""
    });
    event.preventDefault();

  };


  return ( <
    >
    <
    h1 > Login < /h1> <
    div className = "login" >

    <
    div >
    <
    form onSubmit = {
      tryLogin
    } >
    <
    div class = "form-group" >
    <
    label > User Name < /label> <
    input name = "username"
    onChange = {
      handleChange
    }
    type = "text"
    autoComplete="off"
    value={profile.username}
    class = "form-control" autoFocus / >

    <
    /div> <
    div class = "form-group" >
    <
    label > Password < /label> <
    input name = "password"
    onChange = {
      handleChange
    }
    type = "password"
    value={profile.password}
    class = "form-control" / >
    <
    /div>

    <
    button type = "submit"
    class = "btn btn-success" > Login < /button>

     <
    /form> <
    /div>

    <
    /div> <
    />
  )
}

export default Login;
