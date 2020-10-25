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
import { connect } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { bindActionCreators } from 'redux';
import { setCurrentThread, setAllThreads } from '../../redux/actions/threadActions'


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


Modal.setAppElement('#root')

let currentThreadIndex = -1

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [isSearchListOpen, setSearchListOpen] = useState(false)
  const { currentUser, allUsers, allThreads, currentThread, setCurrentThread, setAllThreads } = props
  const [otherUser, setOtherUser] = useState(null)
  const newUsers = allUsers.filter(user => user.uid !== currentUser.uid)
  useEffect(function () {
    let threadsRef = firebase.database().ref('/threads')
    threadsRef.on('value', function (snapshot) {
      const val = snapshot.val()
      let threads = []
      if (val) {
        let threadIds = Object.keys(val)
        threads = threadIds.map(tId => val[tId])
      }
      setAllThreads(threads)
      scrollChatDivToBottom()
    })
  }, []);

  const scrollChatDivToBottom = () => {
    var div = document.getElementById("chat-div");
    div.scrollTop = div.scrollHeight;
  }

  const handleNewButtonClicked = () => {
    setSearchListOpen(true)
  }
  const handleSearchListClosed = () => {
    setSearchListOpen(false);
  }
  const handleSignoutButtonClick = () => {
    firebase.auth().signOut().then(() => {
      props.history.push('/login');
    }).catch(err => {
      console.log(err)
    });
  }

  const handleThreadClicked = (thread, i) => {
    setCurrentThread(thread)
    currentThreadIndex = i
    scrollChatDivToBottom()
    const otherUser = thread.users.find(u => u.uid !== currentUser.uid)
    setOtherUser(otherUser)
  }

  const onSetMessage = async () => {
    let msg = {
      message: message,
      createdAt: new Date().getTime(),
      sender: currentUser.uid,
    }
    let currentThreadRef = firebase.database().ref(`/threads/${currentThread.id}`)
    let snapshot = await currentThreadRef.once('value');
    let val = snapshot.val()
    if (!val.messages) {
      val.messages = []
    }
    val.messages.push(msg)
    currentThreadRef.set(val)
    setCurrentThread(val)
    setMessage("")
    scrollChatDivToBottom()
  }

  const createNewThread = (user) => {
    let existingThread = allThreads.find(t => {
      return t.users.find(u => u.uid === user.uid) && t.users.find(u => u.uid === currentUser.uid)
    })
    let thread = null;
    if (existingThread) {
      thread = existingThread
    } else {
      let threadsRef = firebase.database().ref('/threads')
      let newThreadRef = threadsRef.push()
      thread = {
        users: [currentUser, user],
        createdBy: currentUser.uid,
        createdAt: new Date().getTime(),
        messages: [],
        id: newThreadRef.key
      }
      newThreadRef.set(thread)
    }
    setCurrentThread(thread)
    setSearchListOpen(false);
    scrollChatDivToBottom();
    const otherUser = thread.users.find(u => u.uid !== currentUser.uid)
    setOtherUser(otherUser)
  }

  return (
    <div style={{ margin: "auto", border: "1px solid grey", backgroundColor: 'white' }} className="container">
      <div className="row">
        <div className="col-md-4" style={{ borderRight: "1px solid black" }}>
          <div className="row top-row d-flex justify-content-between align-items-center" style={{ backgroundColor: '#e0ece4' }}>
            <Contact name={currentUser ? currentUser.displayName : ''} source={profilePic} />
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
              {allThreads.map((thread, i) => <Thread onClick={() => handleThreadClicked(thread, i)} thread={thread} key={i} source={profilePic} />)}
            </div>
          </div>
        </div>
        <div className="col-md-8 second-col">
          <div className="row top-row d-flex pl-3 justify-content-between align-items-center">
            {currentThread && <Contact name={otherUser ? otherUser.displayName : ''} source={profilePic} />}<span></span>
            <button className="btn btn-danger btn-sm mr-3" onClick={handleSignoutButtonClick}>Signout <ExitToAppIcon /></button>
          </div>
          <div className="chat-area">
            <ChatLayout messages={currentThread ? allThreads[currentThreadIndex].messages : []} />
          </div>
          <div className="text-area">
            <div className="row">
              <div className="col-md-10">
                <input disabled={!currentThread} value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" />
              </div>
              <div className="col-md-2 send-button">
                <button disabled={!currentThread} onClick={onSetMessage} className="btn btn-success btn-sm">Send</button>
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
              {newUsers.map((user, i) =>
                <li onClick={() => createNewThread(user)} key={i} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <Contact name={user.displayName} source={profilePic} />
                    <span><MessageIcon /></span>
                  </div>
                </li>)}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};


const mapStateToProps = ({ auth, thread }) => {
  return {
    currentUser: auth.user,
    allUsers: auth.allUsers,
    allThreads: thread.allThreads,
    currentThread: thread.currentThread,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setCurrentThread, setAllThreads }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

