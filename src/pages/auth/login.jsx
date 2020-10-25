// jshint esversion:6

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as md5 from "md5";
import firebase from "../../util/firebase";
import "./auth.css"

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
    <div className="d-flex justify-content-center align-items-center login-container">
      <div>
        <div className="d-flex justify-content-center">
          <p>
            <i class="fab fa-whatsapp fa-5x"> </i>
          </p>
        </div>
        <div className="login-box">
          <h3 className="text-center"> Login </h3>
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
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" class="btn btn-success">Login</button>
              <Link to={'/signup'}>Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
