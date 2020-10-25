import React from "react";
import Moment from 'react-moment';
import "./message.css";

const calendarStrings = {
  lastDay: '[Yesterday]',
  sameDay: 'LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd',
  nextWeek: 'dddd',
  sameElse: 'L'
};

const ChatLayout = () => {
  const date = new Date();

  const dummyData = [
    {
      message: "1: This should be in left",
      direction: "left",
    },
    {
      message: "2: This should be in right",
      direction: "right",
    },
    {
      message: "3: This should be in left again.testing",
      direction: "left",
    },
    {
      message: "4: This should be in right again. this is just for testing",
      direction: "right",
    },
  ];

  const chatBubbles = dummyData.map((obj, i = 0) => (
    <div className="d-flex" key={i}>
      <div key={i++} className={`p-1 bubble ${obj.direction}`}>
        <div>{obj.message}</div><br />
        <small className="timestamp"><Moment calendar={calendarStrings}>{date}</Moment></small>
      </div>
    </div>
  ));
  return <div className="chat-bubble-container">{chatBubbles}</div>;
};

export default ChatLayout;
