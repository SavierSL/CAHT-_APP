import { useEffect, useState } from "react";
import queryString from "querystring";
import io from "socket.io-client";
import { disconnect } from "process";
let socket: any;
export interface ChatProps {
  location: {
    search: string;
  };
}

const Chat: React.FC<ChatProps> = ({ location }) => {
  const [name, setName] = useState<string | string[] | undefined>("");
  const [room, setRoom] = useState<string | string[] | undefined>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
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

    socket.emit("join", { name, room }, ({ error }: { error: string }) => {
      //error is from socket in index.ts
    });
    return () => {
      socket.emit("disconnect");
    };
  }, [name, room, location.search]);
  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
    });
  }, []);

  return (
    <>
      <div className="outerContainer">
        <div className="1:12:05"></div>
      </div>
    </>
  );
};

export default Chat;
