import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../util/firebase"
import "./auth.css"
import Swal from 'sweetalert2'


const Signup = () => {
  const [profile, setprofile] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    displayName: ""
  });
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setprofile((profile) => {
      return { ...profile, [name]: value };
    });
  };

  const createProfile = async (event) => {
    setLoading(true)
    event.preventDefault();

    if (profile.password !== profile.repeatPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords dont match',
        icon: 'error'
      })
      setLoading(false)
      return
    }

    let email = `${profile.username}@chatapp.com`
    try {
      let auth = await firebase.auth().createUserWithEmailAndPassword(email, profile.password)
      console.log(auth.user.uid)
      firebase.auth().currentUser.updateProfile({
        displayName: profile.username
      })

      // add the user to the list of users
      firebase.database().ref(`/users/${auth.user.uid}`).set({
        email: auth.user.email,
        username: profile.username,
        photoURL: auth.user.photoURL,
        displayName: profile.username,
        uid: auth.user.uid
      });

      setprofile({ username: "", password: "" });
      history.push('/chat')
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error'
      })
    } finally {
      setLoading(false)
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
              {!loading ? <button type="submit" className="btn btn-success">Signup </button> :
                <div class="spinner-border" role="status">
                  <span class="sr-only">signin up...</span>
                </div>}
              <Link to={'/login'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
