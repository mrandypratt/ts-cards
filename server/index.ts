import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("Connected");
});

httpServer.listen(4000, () => {
  console.log("Listening on PORT: " + 4000);
});