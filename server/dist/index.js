"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./router"));
const users_1 = require("../src/users");
const app = express_1.default();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("we have a new conenction!!!");
    socket.on("disconnect", () => {
        console.log("user has left");
    });
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = users_1.addUser({ id: socket.id, name, room });
        socket.emit("message", {
            user: "Adming",
            text: `${user === null || user === void 0 ? void 0 : user.name} welcome to the room`,
        });
        socket.broadcast
            .to(user === null || user === void 0 ? void 0 : user.room)
            .emit("message", { user: "admin", text: `${user === null || user === void 0 ? void 0 : user.name} has joined` });
        if (error) {
            return callback({ error: "error" });
        }
        socket.join(user === null || user === void 0 ? void 0 : user.room);
        callback();
    });
    socket.on("sendMessage", (message, callback) => {
        const user = users_1.getUser(socket.id);
        io.to(user.room.emit("message", { user: user.name, text: message }));
        callback();
    });
    socket.on("disconnect", () => {
        console.log("user left");
    });
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
app.use(router_1.default.router);
server.listen(PORT, () => console.log("Server has started on port 5000"));
//# sourceMappingURL=index.js.map