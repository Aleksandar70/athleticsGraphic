import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Paths } from "../../../global/constants/api";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://${Paths.IPV4}:5000`,
    credentials: false,
  },
});

httpServer.listen(5002);

export default io;
