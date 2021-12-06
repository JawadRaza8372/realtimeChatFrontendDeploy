import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./ChatPage.scss";
import Message from "../../Components/Mesaage/Message";
import socketIo from "socket.io-client";
import { user } from "../HomePage/HomePage";
import ReactScrollToBottom from "react-scroll-to-bottom";
import NotificationMessage from "../../Components/NotficationMessage/NotificationMessage";
let socket;
function ChatPage() {
  const endpoint = "https://redrealtimesocketschatapp.herokuapp.com";

  const [message, setmessage] = useState("");
  const [sentMessages, setsentMessages] = useState([]);

  const [id, setid] = useState("");
  useEffect(() => {
    socket = socketIo(endpoint, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setid(socket?.id);
    });
    socket.emit("joined", { user });
  }, [endpoint]);

  useEffect(() => {
    socket.on("welcome", ({ user, message }) => {
      setsentMessages((prevalue) => [...prevalue, { user, message, id: null }]);
    });
    socket.on("userjoined", ({ user, message }) => {
      setsentMessages((prevalue) => [...prevalue, { user, message, id: null }]);
    });
    socket.on("userleft", ({ user, message }) => {
      setsentMessages((prevalue) => [...prevalue, { user, message, id: null }]);
    });
    socket.on("sendedMsg", ({ user, message, id }) => {
      setsentMessages((prevalue) => [...prevalue, { user, message, id: id }]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { message, id });
      setmessage("");
    }
  };

  return (
    <section className="chatpage">
      <div className="chatContainer">
        <div className="chatHeader">
          <a href="/">
            <span>Dev</span> Chat
          </a>
        </div>
        <ReactScrollToBottom
          className="chatContent"
          followButtonClassName="buttonc"
        >
          {sentMessages &&
            sentMessages?.map((dat, index) =>
              dat.id !== null ? (
                <Message
                  key={index}
                  msg={dat.message}
                  userid={dat.id}
                  user={dat.user}
                  currentUser={id}
                />
              ) : (
                <NotificationMessage key={index} notification={dat.message} />
              )
            )}
        </ReactScrollToBottom>
        <form onSubmit={sendMessage} className="chatFooter">
          <input
            placeholder="Enter Your Message"
            type="text"
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            required
            value={message}
            minLength={1}
          />
          <button type="submit" className="sendbutton">
            <SendIcon id="icon" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatPage;
