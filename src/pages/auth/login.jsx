// jshint esversion:6

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../util/firebase";
import Swal from 'sweetalert2'

import "./auth.css"

const Login = () => {
  const [profile, setprofile] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(`${profile.username}@chatapp.com`, profile.password).then(auth => {
      history.push('/chat')
      setprofile({
        username: "",
        password: "",
      });
    }).catch(err => {
      console.log(err)
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error'
      })
    }).finally(() => {
      setLoading(false)
    })
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
              {!loading ?
                <button type="submit" class="btn btn-success">Login</button> :
                <div class="spinner-border" role="status">
                  <span class="sr-only">signin in...</span>
                </div>}
              <Link to={'/signup'}>Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
