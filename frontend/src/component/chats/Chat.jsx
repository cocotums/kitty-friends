import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";

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
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    if (e.key !== "Enter") {
      setMessage(e.target.value);
    }
  }

  function onEnter(e) {
    if (e.key == "Enter") {
      sendMessage(e);
    }
  }

  return (
    <Page>
      <Container>
        {messages &&
          messages.map((msg, i) => {
            if (msg.message.id == user._id) {
              return (
                <MyRow key={i}>
                  <MyMessage>
                    {msg.message.name} : {msg.message.body}
                  </MyMessage>
                </MyRow>
              );
            }
            return (
              <PartnerRow key={i}>
                <PartnerMessage>
                  {msg.message.name} : {msg.message.body}
                </PartnerMessage>
              </PartnerRow>
            );
          })}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea
          value={message}
          onChange={handleChange}
          placeholder="Say something..."
          onKeyPress={onEnter}
        />
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default Chat;

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #46516e;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: pink;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;
