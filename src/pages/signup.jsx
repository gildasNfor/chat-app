import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../util/firebase";
import "../styles.css";
import * as md5 from "md5";

const Signup = () => {
  const [profile, setprofile] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setprofile((profile) => {
      return { ...profile, [name]: value };
    });
  };

  const createProfile = (event) => {
    const userList = firebase.database().ref("users");
    const newProfile = {
      username: profile.username,
      password: md5(profile.password),
    };

    userList.on("value", (snapshot) => {
      const users = snapshot.val();
      const currentUsers = [];

      for (let id in users) {
        currentUsers.push(users[id].username);
      }

      if (currentUsers.indexOf(newProfile.username) === -1) {
        userList.push(newProfile);
        console.log(`added`);
        setprofile({ username: "", password: "" });
        // eslint-disable-next-line no-unused-expressions
        // <Redirect to="/success" />;
        history.push("/success");
      } else {
        // eslint-disable-next-line no-unused-expressions
        // <Redirect to="/failure" />;
        history.push("/failure");
      }
    });

    setprofile({ username: "", password: "" });
    event.preventDefault();
  };

  return (
    <>
      <h1>Signup</h1>
      <div className="login">
        <div>
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

            <button type="submit" className="btn btn-success">
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
