// jshint esversion:6

import React, { useState } from "react";
import { axios } from "axios";
import Contact from "./Contact";

const Success = () => {
  const names = [
    "Ballack",
    "Bojan",
    "Excess",
    "Lord Bright",
    "Horse Man",
    "Ballack",
    "Bojan",
    "Excess",
    "Lord Bright",
    "Horse Man",
  ];
  let [activeChat, setActiveChat] = useState("");

  const openChat = (chatter) => {
    setActiveChat(chatter);
  };

  return (
    <>
      <div className="contacts">
        <i class="fas fa-search"></i>
        <input
          className="search-contact-list"
          type="text"
          placeholder="Search or start new chat"
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        />

        {names.map((name) => (
          <Contact
            openChat={openChat}
            name={name}
            // source={getPhotos()[Math.floor(Math.random() * 30)].download_url}
          />
        ))}
      </div>
      <div className="chat-zone">
        <div className="heading">
          <Contact name={activeChat} />
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
