import React from "react";

const Thread = (props) => {
  const date = new Date();
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <div className="row-no-margin thread-item">
        <div className="col-md-3">
          <img className="profile-pic" src={props.source} alt="display" />
        </div>
        <div className="col-md-7 mr-auto">
          <div className="row name">Name</div>
          <div className="row last-message">Last Message...</div>
        </div>
        <div className="col-md-2 time">{time}</div>
      </div>
      <hr className="boundary"></hr>
    </>
  );
};

export default Thread;
