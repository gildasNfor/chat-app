import React from "react";

const ChatLayout = () => {
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
      message: "3: This should be in left again",
      direction: "left",
    },
    {
      message: "4: This should be in right again",
      direction: "right",
    },
  ];

  const chatBubbles = dummyData.map((obj, i = 0) => (
    <div className={`bubble-container ${obj.direction} `} key={i}>
      <div key={i++} className={`bubble `}>
        <div>{obj.message}</div>
      </div>
    </div>
  ));
  return <div className="chat-bubble-container">{chatBubbles}</div>;
};

// const Text = (props) => {
//   const options = {
//     month: "long",
//     day: "numeric",
//   };
//   const date = new Date();
//   const today = date.toLocaleDateString(undefined, options);
//   const time = date.toLocaleTimeString("en-GB", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="note">
//       <span className="text">{props.text}</span>
//       <span className="date-time">{today + ", " + time}</span>
//     </div>
//   );
// };

export default ChatLayout;
