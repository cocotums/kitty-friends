import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chatStyle.scss";

const URL = "http://localhost:2626";

const Chat = (props) => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("mewo");
    setUser(props.user);
  }, [props.user]);

  const socketRef = useRef();
  const chatbox = useRef();

  useEffect(() => {
    socketRef.current = io.connect(URL);

    socketRef.current.on("chat message", (message) => {
      receivedMessage(message);
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
    chatbox.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
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
      <div className="container" ref={chatbox}>
        <ScrollToBottom>
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
        </ScrollToBottom>
      </div>
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
  );
};

export default Chat;
