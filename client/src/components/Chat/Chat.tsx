import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io, Socket } from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket: Socket;

interface Prop {
  location: Location;
}

const Chat: React.FC<Prop> = ({ location }) => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [users, setUsers] = useState<{ name: string }[]>([]);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    // TODO: we need type about querystring?
    const { room, name } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    if (typeof name == "string") setName(name as string);
    if (typeof room == "string") setRoom(room as string);

    socket.emit(
      "join",
      { name, room },
      (errorResponse: null | { error: string }) => {
        if (errorResponse) alert(errorResponse.error);
      }
    );

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event: React.KeyboardEvent | React.MouseEvent) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {/* <TextContainer users={users} /> */}
      </div>
    </div>
  );
};

export default Chat;
