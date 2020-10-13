// jshint esversion:6

import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import * as md5 from "md5";
import firebase from "../util/firebase";
import "../styles.css";

const Login = () => {
  const [profile, setprofile] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setprofile((profile) => {
      return {
        ...profile,
        [name]: value,
      };
    });
  };

  const tryLogin = (event) => {
    const profiles = firebase.database().ref("users");
    const checkProfile = {
      password: md5(profile.password),
      username: profile.username,
    };

    profiles.on("value", (snapshot) => {
      const users = snapshot.val();
      const list = [];

      for (let id in users) {
        list.push(JSON.stringify(users[id]));
      }

      if (list.indexOf(JSON.stringify(checkProfile)) === -1) {
        history.push("/failure");
      } else {
        history.push("/success");
      }
    });
    setprofile({
      username: "",
      password: "",
    });
    event.preventDefault();
  };

  return (
    <>
      <h1> Login </h1>
      <div className="login">
        <div>
          <form onSubmit={tryLogin}>
            <div class="form-group">
              <label> User Name </label>
              <input
                name="username"
                onChange={handleChange}
                type="text"
                autoComplete="off"
                value={profile.username}
                class="form-control"
                autoFocus
                required
              />
            </div>
            <div class="form-group">
              <label> Password </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                value={profile.password}
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
