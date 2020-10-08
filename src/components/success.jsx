// jshint esversion:6

import React from "react";
import Contact from "./Contact";

const Success = () => {
  return (
    <>
      <div className="contacts">
        <i class="fas fa-search"></i>
        <input
          className="search-contact-list"
          type="text"
          placeholder="Search or start new chat"
        />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
        <Contact name="Ballack" text="Welcome to my chat app" />
      </div>
      <div className="chat-zone">
        <div className="heading">
          <Contact name="Ballack" />
        </div>
        <div className="write-message">
          <input
            className="send-message"
            type="text"
            placeholder="Type a message"
          />
          <button className="btn btn-success send-button">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
