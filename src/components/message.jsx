import React from "react";

const ChatLayout = () => {
  const date = new Date();
  const timeSent = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
    <div className={`bubble-container `} key={i}>
      <div key={i++} className={`bubble ${obj.direction}`}>
        <div>{obj.message}</div>
        <span class="timestamp">{timeSent}</span>
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
