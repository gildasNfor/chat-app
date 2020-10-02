// jshint esversion:6

import React, { useState } from 'react';
import firebase from '../util/firebase';
import "../styles.css";
import * as md5 from "md5";

const Signup = () => {

    const [profile, setprofile] = useState({

        username: "",
        password: ""
    });

    const handleChange = event => {

        const {name, value} = event.target;

        setprofile(profile => {return {...profile, [name]: value}});
    };

    const createProfile = event => {

        const userList = firebase.database().ref();
        const newProfile = {
          username: profile.username,
          password: md5(profile.password)
        };

        userList.push(newProfile);
        setprofile({username: "", password: ""});
        event.preventDefault();
    };


    return(

        <>
            <h1>Signup</h1>
            <div className="login">

                <div>
                    <form onSubmit={createProfile}>
                        <div className="form-group">
                            <label>User Name</label>
                          <input name="username" onChange={handleChange} type="text" className="form-control" autoComplete="off" value={profile.username} autoFocus />

                        </div>
                        <div className="form-group">
                            <label>Password</label>
                          <input name="password" onChange={handleChange} type="password" className="form-control" value={profile.password}  />
                        </div>

                        <button type="submit" className="btn btn-success">Signup</button>
                    </form>
                </div>

           </div>
       </>
    )
}

export default Signup;
