import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";
import { EVENTS } from "../client/src/data/constants/socketEvents";

const httpServer = createServer();
const io = new Server(httpServer, {});

type GameStore = {
  [lobbyId: string]: Game;
}

const gameStore: GameStore = {};

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);

  socket.on(EVENTS.createGame, (game: Game) => {
    socket.join(game.lobbyId);
    gameStore[game.lobbyId] = Object.assign(new Game(), game);
    console.log(`Client ${socket.id} created Room ${game.lobbyId}`)
    io.to(game.lobbyId).emit(EVENTS.updateClient, gameStore[game.lobbyId]);
  })
  
  socket.on(EVENTS.joinRoom, (game: Game, player: Player) => {
    if (gameStore[game.lobbyId]) {
      socket.join(game.lobbyId);
      console.log(`Client ${socket.id} joined Room ${game.lobbyId}`)
      gameStore[game.lobbyId].addPlayer(player);
      io.to(game.lobbyId).emit(EVENTS.updateClient, gameStore[game.lobbyId]);
    } else {
      socket.emit(EVENTS.roomDoesNotExist, "error");
    }
  })

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

httpServer.listen(4000, () => {
  console.log("Listening on PORT: " + 4000);
});