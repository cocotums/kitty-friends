import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./chatStyle.scss";
import { animateScroll } from "react-scroll";

const URL = "http://localhost:2626";

const Chat = (props) => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chatbox",
    });
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(URL);
    socketRef.current.on("chat message", (message) => {
      receivedMessage(message);
      scrollToBottom();
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    let { _id, username } = user;

    const messageObject = {
      body: message,
      id: _id,
      name: username,
    };
    setMessage("");

    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    if (e.key !== "Enter") {
      setMessage(e.target.value);
    }
  }

  function onEnter(e) {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  }

  return (
    <div className="page">
      <div className="container" id="chatbox">
        {messages &&
          messages.map((msg, i) => {
            if (msg.message.id === user._id) {
              return (
                <div className="myRow" key={i}>
                  <div className="myMessage">
                    {msg.message.name} : {msg.message.body}
                  </div>
                </div>
              );
            }
            return (
              <div className="partnerRow" key={i}>
                <div className="partnerMessage">
                  {msg.message.name} : {msg.message.body}
                </div>
              </div>
            );
          })}
      </div>
      <div className="container-input">
        <form classname="form" onSubmit={sendMessage}>
          <textarea
            className={"textbox"}
            value={message}
            onChange={handleChange}
            placeholder="Say something..."
            onKeyPress={onEnter}
          />
          <button className="button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
