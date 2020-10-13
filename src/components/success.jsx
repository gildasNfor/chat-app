// jshint esversion:6

import React, { useState, useEffect } from "react";
import firebase from "../util/firebase";
import Contact from "./Contact";

const Success = () => {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [photosAvailable, setPhotosAvailable] = useState(false);
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState(
    "https://www.htmlcsscolor.com/preview/gallery/E0ECE4.png"
  );

  useEffect(() => {
    const profiles = firebase.database().ref("users");

    profiles.on("value", (snapshot) => {
      const userList = snapshot.val();
      const accounts = [];
      for (let id in userList) {
        accounts.push(userList[id]);
      }
      setUsers(accounts);
    });

    fetch("https://picsum.photos/v2/list")
      .then((response) => response.json())
      .then((response) => {
        setPhotos(response);
        setPhotosAvailable(true);
      });
  }, []);

  console.log(photos);

  const openChat = (chatter, dp) => {
    setActiveChat(chatter);
    setDisplayPhoto(dp);
  };

  const handleChange = (event) => {
    const text = event.target.value;
    setMessage(text);
  };

  const handleClick = () => {
    console.log(message);
    setMessage("");
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);

    const profiles = firebase.database().ref("users");

    profiles.on("value", (snapshot) => {
      const userList = snapshot.val();
      const accounts = [];
      for (let id in userList) {
        accounts.push(userList[id]);
      }
      const updatedList = accounts.filter((account) =>
        account.username.includes(query)
      );
      setUsers(updatedList);
    });
  };

  return (
    <>
      <div className="contacts">
        <i class="fas fa-search"></i>
        <input
          onChange={handleSearch}
          className="search-contact-list"
          type="text"
          placeholder="Search or start new chat"
          value={search}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        />

        {users.map((user, index) => (
          <Contact
            key={index}
            openChat={openChat}
            name={user.username}
            source={
              photosAvailable && photos[index % photos.length].download_url
            }
          />
        ))}
      </div>
      <div className="chat-zone">
        <div className="heading">
          <Contact name={activeChat} source={displayPhoto} />
        </div>
        <div className="write-message">
          <input
            onChange={handleChange}
            className="send-message"
            type="text"
            placeholder="Type a message"
            value={message}
          />
          <button onClick={handleClick} className="btn btn-success send-button">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
