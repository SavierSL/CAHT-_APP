"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./router"));
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
        console.log(name, room);
        const error = true;
        if (error) {
            callback({ error: "error" });
        }
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