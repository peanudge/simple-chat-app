import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io, Socket } from "socket.io-client";

let socket: Socket;

interface Prop {
  location: Location;
}

const Chat: React.FC<Prop> = ({ location }) => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    // TODO: we need type about querystring?
    const { room, name } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    if (typeof name == "string") setName(name as string);
    if (typeof room == "string") setRoom(room as string);

    socket.emit("join", { name, room }, ({ error }: { error: string }) => {
      alert(error);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
