import React from "react";
import Moment from 'react-moment';
import { connect } from 'react-redux';
import "./message.css";

const calendarStrings = {
  lastDay: '[Yesterday]',
  sameDay: 'LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd',
  nextWeek: 'dddd',
  sameElse: 'L'
};

const ChatLayout = (props) => {
  const { messages, currentUser } = props;

  const chatBubbles = messages.map((message, i = 0) => (
    <div className="d-flex mb-2" key={i}>
      <div key={i++} className={`p-1 bubble ${message.sender === currentUser.uid ? 'right' : 'left'}`}>
        <div>{message.message}</div><br />
        <small className="timestamp"><Moment calendar={calendarStrings}>{new Date(message.createdAt)}</Moment></small>
      </div>
    </div>
  ));
  return <div className="chat-bubble-container" id="chat-div">{chatBubbles}</div>;
};

const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.user,
  }
}

export default connect(mapStateToProps, null)(ChatLayout);


