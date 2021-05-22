import { useEffect, useState } from "react";
import queryString from "querystring";
import io from "socket.io-client";
let socket;
export interface ChatProps {
  location: {
    search: string;
  };
}

const Chat: React.FC<ChatProps> = ({ location }) => {
  const [name, setName] = useState<string | string[] | undefined>("");
  const [room, setRoom] = useState<string | string[] | undefined>("");
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search.slice(1)); //the url will make it into object

    //when we get our first connection we need to set our socket
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    console.log(socket);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });
  }, [name, room, location.search]);

  return (
    <>
      <h1>Chat</h1>
    </>
  );
};

export default Chat;
