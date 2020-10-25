import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../util/firebase"
import * as md5 from "md5";
import "./auth.css"
import Swal from 'sweetalert2'


const Signup = () => {
  const [profile, setprofile] = useState({
    username: "",
    password: "",
    repeatPassword: ""
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setprofile((profile) => {
      return { ...profile, [name]: value };
    });
  };

  const createProfile = async (event) => {
    event.preventDefault();

    let email = `${profile.username}@chatapp.com`
    try {
      let auth = await firebase.auth().createUserWithEmailAndPassword(email, profile.password)
      console.log(auth)
      firebase.auth().currentUser.updateProfile({
        displayName: profile.username
      })
      setprofile({ username: "", password: "" });

    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error'
      })
    }
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
          <h3 className="text-center"> Signup </h3>
          <form onSubmit={createProfile}>
            <div className="form-group">
              <label>User Name</label>
              <input
                name="username"
                onChange={handleChange}
                type="text"
                className="form-control"
                autoComplete="off"
                value={profile.username}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                className="form-control"
                value={profile.password}
                required
              />
            </div>

            <div className="form-group">
              <label>Repeat password</label>
              <input
                name="repeatPassword"
                onChange={handleChange}
                type="password"
                className="form-control"
                value={profile.repeatPassword}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-success">Signup </button>
              <Link to={'/login'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
