import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

const EVENTS = {
  newGame: "new-game",
}

io.on("connection", (socket) => {

  socket.on("connect", () => {
    console.log(`Client ${socket.id} connected`);
  });

  socket.on(EVENTS.newGame, (socketID) => {
    console.log(`Event from Back end socket ${socketID}`)
  })

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});


httpServer.listen(4000, () => {
  console.log("Listening on PORT: " + 4000);
});