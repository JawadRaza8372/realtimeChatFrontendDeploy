import React from "react";
import "./Message.scss";
function Message({ msg, userid, user, currentUser }) {
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <div className={currentUser === userid ? "rightdiv" : "leftdiv"}>
        <p className="message">
          {currentUser === userid ? "You : " : `${user} : `} {msg}
        </p>
      </div>
    </div>
  );
}

export default Message;
