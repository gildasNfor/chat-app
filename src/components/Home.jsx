// jshint esversion:6

import React from 'react';
import { Link } from "react-router-dom";
import "../styles.css";


export default function Home() {

  return (
     <div >
      < h1 > Chat App < /h1>
      <  p > < i class = "fab fa-whatsapp fa-5x" > < /i></p >
     <Link to="/Login"><button className = "btn btn-outline-dark btn-lg f-icons" > Login < /button></Link>
    <Link to="/Signup"><button className = "btn btn-success btn-lg f-icons" > Signup < /button></Link>
    </div>
  )
}
