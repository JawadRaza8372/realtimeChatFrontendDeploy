import React from "react";
import "./NotificationMessage.scss";
function NotificationMessage({ notification }) {
  return (
    <div className="notificatiionMsg">
      <span>{notification}</span>
    </div>
  );
}

export default NotificationMessage;
