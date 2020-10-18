import React from "react";

const Text = (props) => {
  const options = {
    month: "long",
    day: "numeric",
  };
  const date = new Date();
  const today = date.toLocaleDateString(undefined, options);
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="note">
      <span className="text">{props.text}</span>
      <span className="date-time">{today + ", " + time}</span>
    </div>
  );
};

export default Text;
