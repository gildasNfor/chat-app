// jshint esversion:6

import React, { useState, useEffect } from "react";
import firebase from "../../util/firebase";
import Contact from "../../components/contact/contact";
import Thread from "../../components/thread/thread";
import ChatLayout from "../../components/message/message";
import Modal from 'react-modal';
import AddIcon from '@material-ui/icons/Add';
import MessageIcon from '@material-ui/icons/Message';
import CloseIcon from '@material-ui/icons/Close';
import "./chat.css"
import profilePic from '../../assets/profile.png'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '30%',
    height: '40%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d4d8d1'
  }
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

Modal.setAppElement('#root')

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
  const [isSearchListOpen, setSearchListOpen] = useState(false)

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

  const handleNewButtonClicked = () => {
    setSearchListOpen(true)
  }
  const handleSearchListClosed = () => {
    setSearchListOpen(false);
  }

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
    <div style={{ margin: "auto", border: "1px solid grey", backgroundColor: 'white' }} className="container">
      <div className="row">
        <div className="col-md-4" style={{ borderRight: "1px solid black" }}>
          <div className="row top-row d-flex justify-content-between align-items-center" style={{ backgroundColor: '#e0ece4' }}>
            <Contact name="Bill" source={profilePic} />
            <button className="btn btn-primary btn-sm mr-3" onClick={handleNewButtonClicked}>New <AddIcon /></button>
          </div>
          <div className="row search-row">
            <input type="text" placeholder="search" className="form-control p-2"
            />
          </div>
          <div className="row">
            {" "}
            {/** threads */}
            <div className="thread-list">
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
              <Thread source={profilePic} />
            </div>
          </div>
        </div>
        <div className="col-md-8 second-col">
          <div className="row top-row d-flex pl-3">
            <Contact name="Bill" source={profilePic} />
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

      <Modal
        isOpen={isSearchListOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          Start a new chat
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input className="form-control" placeholder="search" />
            <button className="btn btn-danger btn-sm ml-3" onClick={handleSearchListClosed}><CloseIcon /></button>
          </div>
          <div className="search-list">
            <ul className="list-group">
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Contact name="Bill" source={profilePic} />
                  <span><MessageIcon /></span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Contact name="Bill" source={profilePic} />
                  <span><MessageIcon /></span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Contact name="Bill" source={profilePic} />
                  <span><MessageIcon /></span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Contact name="Bill" source={profilePic} />
                  <span><MessageIcon /></span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Contact name="Bill" source={profilePic} />
                  <span><MessageIcon /></span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <Contact name="Bill" source={profilePic} />
                  <span><MessageIcon /></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
