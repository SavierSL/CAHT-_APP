import express from "express";
import { Server } from "socket.io";
import http from "http";
import sample from "./router";
import { Nxt, Req, Res } from "./TS/types";
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
  socket.on("join", ({ name, room }, callback) => {
    //we cann pass a callback so we can trigger some response immediately and a client has an access to it!
    console.log(name, room);
    const error = true;
    if (error) {
      callback({ error: "error" });
    }
  }); //something is going to happen on join base on client
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
