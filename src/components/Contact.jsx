import React from "react";

const Contact = (props) => {
  return (
    <div
      onClick={() => props.openChat(props.name)}
      className="individual-contact"
    >
      <img
        className="profile-pic"
        src="https://picsum.photos/200/300"
        alt="display"
      />
      <p id="last-seen">
        <p className="name">{`${props.name}`}</p>
        <hr className="boundary"></hr>
      </p>
    </div>
  );
};

export default Contact;
