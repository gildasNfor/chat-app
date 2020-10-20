// jshint esversion:6

import React, { useState, useEffect } from "react";
import firebase from "../util/firebase";
import Contact from "../components/Contact";
import Thread from "../components/thread";
import ChatLayout from "../components/message";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [photosAvailable, setPhotosAvailable] = useState(false);
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState(
    "https://www.htmlcsscolor.com/preview/gallery/E0ECE4.png"
  );

  const myProfilePicURL =
    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

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
    <div style={{ margin: "auto" }} className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="row top-row">
            {" "}
            {/** your name and add button */}
            <div className="col-md-10">
              <Contact name="Bill" source={myProfilePicURL} />
            </div>
            <div className="col-md-2 new-message">
              <button className="btn btn-primary btn-sm">New </button>
            </div>
          </div>
          <div className="row search-row">
            {" "}
            {/** search */}
            <input
              type="text"
              placeholder="search"
              className="form-control search-contact-list"
            />
          </div>
          <div className="row">
            {" "}
            {/** threads */}
            <div className="thread-list full-height">
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
              <Thread source={myProfilePicURL} />
            </div>
          </div>
        </div>
        <div className="col-md-8 second-col">
          <div className="row top-row present-chat">
            {" "}
            {/** your name and add button */}
            <Contact name="Bill" source={myProfilePicURL} />
          </div>
          <div className="chat-area">
            <ChatLayout />
          </div>
          <div className="text-area">
            <div className="row">
              <div className="col-md-10">
                <input className="form-control" />
              </div>
              <div className="col-md-2 send-button">
                <button className="btn btn-success btn-sm">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
