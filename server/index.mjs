import express from "express";
import http from "http";
import { Server } from "socket.io";

import router from "./router.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);

    // DEBUG
    // const error = true;
    // if (error) {
    //   callback({ error: "error" });
    // }
  });

  socket.on("disconnect", () => {
    console.log("User had left!!");
  });
});

httpServer.listen(PORT, () =>
  console.log(`Server has started on port ${PORT}`)
);
