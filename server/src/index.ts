import express from "express";
import { Server } from "socket.io";
import http from "http";
import sample from "./router";
import { Nxt, Req, Res } from "./TS/types";
import { addUser, removeUser, getUser, getUsersInRoom } from "../src/users";
const app = express();

const PORT = process.env.PORT || 5000;

//socket.io documentation
const server: http.Server = http.createServer(app);
const io = new Server(server);
// Rules of our API

io.on("connection", (socket) => {
  //we are managing socket
  console.log("we have a new conenction!!!");
  socket.on("disconnect", () => {
    console.log("user has left");
  });

  //emit is emit from back end to front end
  //on is expect expect the event on the backend

  socket.on("join", ({ name, room }, callback) => {
    //we cann pass a callback so we can trigger some response immediately and a client has an access to it!
    const { error, user } = addUser({ id: socket.id, name, room });
    socket.emit("message", {
      user: "Adming",
      text: `${user?.name} welcome to the room`,
    });
    socket.broadcast
      .to(user?.room)
      .emit("message", { user: "admin", text: `${user?.name} has joined` }); //to all
    if (error) {
      return callback({ error: "error" });
    }

    socket.join(user?.room); //join in room. next is to handle messages
    callback(); //we can add the callback here so that in client it gets call everytime, if no error we are not going to pass the error
  }); //something is going to happen on join base on client
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room.emit("message", { user: user.name, text: message })); //message is coming from the front end
    callback(); //so we can do something after the message is sent on the front end
  }); //transfer to front end to emit those event
  socket.on("disconnect", () => {
    console.log("user left");
  });
});

//RULES
app.use((req: Req, res: Res, next: Nxt) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  next();
});

app.use(sample.router);
server.listen(PORT, () => console.log("Server has started on port 5000"));
