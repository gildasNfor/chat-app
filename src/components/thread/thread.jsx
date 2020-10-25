import React from "react";
import Moment from 'react-moment';
import "./thread.css"
import '../contact/contact.css'
import { connect } from 'react-redux';


const calendarStrings = {
  lastDay: '[Yesterday]',
  sameDay: 'LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd',
  nextWeek: 'dddd',
  sameElse: 'L'
};


const Thread = (props) => {
  const { thread, onClick, currentUser } = props

  const lastMessage = thread.messages ? thread.messages[thread.messages.length - 1] : null;
  const otherUser = thread.users.find(u => u.uid !== currentUser.uid)

  return (
    <>
      <div onClick={onClick} className="d-flex flex-wrap align-items-center thread-list-item">
        <div className="col-md-3">
          <img className="profile-pic" src={props.source} alt="display" />
        </div>

        <div className="col-md-7">
          <div className="row name">{otherUser.displayName}</div>
          {lastMessage && <div className="row last-message cut-text">{lastMessage.message}</div>}
        </div>
        {lastMessage && <div className="col-md-2 p-0 time"><small><Moment calendar={calendarStrings}>{new Date(lastMessage.createdAt)}</Moment></small></div>}
      </div>
      <hr className="m-0"></hr>
    </>
  );
};

const mapStateToProps = ({ auth, thread }) => {
  return {
    currentUser: auth.user,
    allThreads: thread.allThreads,
  }
}

export default connect(mapStateToProps, null)(Thread);


