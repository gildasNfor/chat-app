// jshint esversion:6

import React from "react";
import { Link } from "react-router-dom";

const Failure = () => {
  return (
    <div class="jumbotron">
      <h1 class="display-4">You need to Sign Up first</h1>
      <hr class="my-4" />
      <Link to="/Signup">
        <button className="btn btn-success btn-lg">Sign Up</button>
      </Link>
    </div>
  );
};

export default Failure;
