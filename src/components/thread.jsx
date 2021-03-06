import React from "react";
import Moment from 'react-moment';

const calendarStrings = {
  lastDay: '[Yesterday]',
  sameDay: 'LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[last] dddd',
  nextWeek: 'dddd',
  sameElse: 'L'
};

const Thread = (props) => {
  const date = new Date(2020, 9, 2)
  return (
    <>
      <div className="row-no-margin thread-item d-flex align-items-center">
        <div className="col-md-3">
          <img className="profile-pic" src={props.source} alt="display" />
        </div>
        <div className="col-md-7">
          <div className="row name">Name</div>
          <div className="row last-message cut-text">very long mmessage</div>
        </div>
        <div className="col-md-2 time"><small><Moment calendar={calendarStrings}>{date}</Moment></small></div>
      </div>
      <hr className="boundary"></hr>
    </>
  );
};

export default Thread;
